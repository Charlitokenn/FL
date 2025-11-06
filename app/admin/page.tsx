import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CreateTenantForm } from '@/components/admin/create-tenant-form';
import { AddUserForm } from '@/components/admin/add-user-form';
import { listAllTenants } from '@/app/actions/tenant-actions';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth();

  // Double-check auth (middleware should handle this)
  if (!userId || sessionClaims?.metadata?.role !== 'super-admin') {
    redirect('/unauthorized');
  }

  const result = await listAllTenants();
  const tenants = result.tenants || [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage organizations, users, and subdomains
          </p>
        </div>
        <CreateTenantForm />
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Organizations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {tenants.length} {tenants.length === 1 ? 'organization' : 'organizations'} total
          </p>
        </div>

        {tenants.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No organizations yet. Create your first one!</p>
          </div>
        ) : (
          <div className="divide-y">
            {tenants.map((tenant) => (
              <div key={tenant.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{tenant.name}</h3>
                      <Badge variant="outline" className="font-mono text-xs">
                        {tenant.subdomain}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">URL:</span>
                        <code className="px-2 py-0.5 rounded bg-muted text-xs">
                          {tenant.subdomain}.yourdomain.com
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Organization ID:</span>
                        <code className="text-xs">{tenant.clerkOrgId}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Created:</span>
                        <span className="text-xs">
                          {tenant.createdAt ? format(new Date(tenant.createdAt), 'PPP') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <AddUserForm
                    organizationId={tenant.clerkOrgId}
                    organizationName={tenant.name}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
