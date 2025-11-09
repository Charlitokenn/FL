'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/database/drizzle';
import { tenants } from '@/database/schema';
import { redis, TENANT_CACHE_TTL } from '@/lib/redis';
import { sanitizeSubdomain, validateSubdomain, getTenantBySubdomain } from '@/lib/tenants';
import { revalidatePath } from 'next/cache';

type CreateTenantInput = {
  organizationName: string;
  subdomain: string;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
};

type CreateTenantResult = {
  success: boolean;
  error?: string;
  tenant?: typeof tenants.$inferSelect;
  organizationId?: string;
};

export async function createTenantWithOrganization(
  input: CreateTenantInput
): Promise<CreateTenantResult> {
  try {
    // Verify super-admin access
    const { userId, sessionClaims } = await auth();
    
    if (!userId || sessionClaims?.credentials !== 'super-admin') {
      return { success: false, error: 'Unauthorized: Super admin access required' };
    }

    // Validate subdomain
    const cleanSubdomain = sanitizeSubdomain(input.subdomain);
    if (!validateSubdomain(cleanSubdomain)) {
      return { 
        success: false, 
        error: 'Invalid subdomain. Must be 3-63 characters, lowercase letters, numbers, and hyphens only.' 
      };
    }

    // Check if subdomain already exists
    const existingTenant = await getTenantBySubdomain(cleanSubdomain);
    if (existingTenant) {
      return { success: false, error: 'Subdomain already exists' };
    }

    const clerk = await clerkClient();

    // Create Clerk organization
    const organization = await clerk.organizations.createOrganization({
      name: input.organizationName,
      publicMetadata: {
        subdomain: cleanSubdomain,
      },
    });

    // Create or get user by email
    let clerkUser;
    try {
      const users = await clerk.users.getUserList({
        emailAddress: [input.ownerEmail],
      });
      
      if (users.data.length > 0) {
        clerkUser = users.data[0];
      } else {
        // Create new user
        clerkUser = await clerk.users.createUser({
          emailAddress: [input.ownerEmail],
          firstName: input.ownerFirstName,
          lastName: input.ownerLastName,
          publicMetadata: {
            role: 'org-admin',
          },
        });
      }
    } catch (error) {
      // Cleanup organization if user creation fails
      await clerk.organizations.deleteOrganization(organization.id);
      throw error;
    }

    // Add user to organization as admin
    await clerk.organizations.createOrganizationMembership({
      organizationId: organization.id,
      userId: clerkUser.id,
      role: 'org:admin',
    });

    // Create tenant in database
    const [newTenant] = await db.insert(tenants).values({
      name: input.organizationName,
      subdomain: cleanSubdomain,
      clerkOrgId: organization.id,
      ownerId: clerkUser.id,
    }).returning();

    // Cache tenant in Redis
    await redis.setex(
      `tenant:subdomain:${cleanSubdomain}`,
      TENANT_CACHE_TTL,
      newTenant
    );
    await redis.setex(
      `tenant:id:${newTenant.id}`,
      TENANT_CACHE_TTL,
      newTenant
    );
    await redis.setex(
      `tenant:org:${organization.id}`,
      TENANT_CACHE_TTL,
      newTenant
    );

    revalidatePath('/admin');

    return {
      success: true,
      tenant: newTenant,
      organizationId: organization.id,
    };
  } catch (error) {
    console.error('Error creating tenant:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create tenant',
    };
  }
}

type AddUserToOrganizationInput = {
  organizationId: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: 'org:admin' | 'org:member';
};

type AddUserResult = {
  success: boolean;
  error?: string;
  userId?: string;
};

export async function addUserToOrganization(
  input: AddUserToOrganizationInput
): Promise<AddUserResult> {
  try {
    // Verify super-admin access
    const { userId, sessionClaims } = await auth();
    
    if (!userId || sessionClaims?.credentials !== 'super-admin') {
      return { success: false, error: 'Unauthorized: Super admin access required' };
    }

    const clerk = await clerkClient();

    // Check if user exists
    let clerkUser;
    const existingUsers = await clerk.users.getUserList({
      emailAddress: [input.email],
    });

    if (existingUsers.data.length > 0) {
      clerkUser = existingUsers.data[0];
    } else {
      // Create new user
      clerkUser = await clerk.users.createUser({
        emailAddress: [input.email],
        firstName: input.firstName,
        lastName: input.lastName,
      });
    }

    // Add user to organization
    await clerk.organizations.createOrganizationMembership({
      organizationId: input.organizationId,
      userId: clerkUser.id,
      role: input.role || 'org:member',
    });

    revalidatePath('/admin');

    return {
      success: true,
      userId: clerkUser.id,
    };
  } catch (error) {
    console.error('Error adding user to organization:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add user',
    };
  }
}

type ListTenantsResult = {
  success: boolean;
  tenants?: Array<typeof tenants.$inferSelect>;
  error?: string;
};

export async function listAllTenants(): Promise<ListTenantsResult> {
  try {
    // Verify super-admin access
    const { userId, sessionClaims } = await auth();
    
    if (!userId || sessionClaims?.credentials !== 'super-admin') {
      return { success: false, error: 'Unauthorized: Super admin access required' };
    }

    const allTenants = await db.select().from(tenants);

    return {
      success: true,
      tenants: allTenants,
    };
  } catch (error) {
    console.error('Error listing tenants:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list tenants',
    };
  }
}
