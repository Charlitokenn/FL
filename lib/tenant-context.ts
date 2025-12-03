import { headers } from 'next/headers';
import { getTenantById } from './tenants';
import type { Tenant } from './tenants';

export async function getCurrentTenant(): Promise<Tenant | null> {
  const headersList = await headers();
  const tenantId = headersList.get('x-tenant-id');
  
  if (!tenantId) {
    return null;
  }
  
  return getTenantById(tenantId);
}

export async function getTenantHeaders() {
  const headersList = await headers();
  
  return {
    tenantId: headersList.get('x-tenant-id'),
    subdomain: headersList.get('x-tenant-subdomain'),
    orgId: headersList.get('x-tenant-org-id'),
  };
}
