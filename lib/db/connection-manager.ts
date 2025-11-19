import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// lib/db/connection-manager.ts
export async function getOrgDatabase() {
  try {
    const { orgId } = await auth();
    
    if (!orgId) {
      throw new Error('User must be part of an organization');
    }

    if (connectionCache.has(orgId)) {
      return connectionCache.get(orgId)!;
    }

    const organization = await clerkClient().organizations.getOrganization({
      organizationId: orgId,
    });

    const connectionString = organization.privateMetadata?.connectionString;

    if (!connectionString || typeof connectionString !== 'string') {
      throw new Error(
        'Database not configured for this organization. Please contact support.'
      );
    }

    const sql = neon(connectionString);
    const db = drizzle(sql, { schema });

    connectionCache.set(orgId, db);
    return db;
    
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}