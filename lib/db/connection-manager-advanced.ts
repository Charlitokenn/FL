import { auth, clerkClient } from '@clerk/nextjs/server';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const poolCache = new Map<string, Pool>();

export async function getOrgDatabase() {
  const { orgId } = await auth();
  
  if (!orgId) throw new Error('No organization');

  if (poolCache.has(orgId)) {
    return drizzle(poolCache.get(orgId)!, { schema });
  }

  const org = await clerkClient().organizations.getOrganization({
    organizationId: orgId,
  });

  const connectionString = org.privateMetadata?.connectionString as string;
  
  const pool = new Pool({ connectionString });
  poolCache.set(orgId, pool);
  
  return drizzle(pool, { schema });
}