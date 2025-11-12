import { auth } from '@clerk/nextjs/server';
import { getCurrentTenant } from '@/lib/tenant-context';
import { Badge } from '@/components/ui/badge';
import { BuildingIcon, UsersIcon } from 'lucide-react';

export default async function TenantDashboardPage() {
  const { userId, sessionClaims } = await auth();
  const tenant = await getCurrentTenant();

  if (!tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">Unable to load tenant information</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{tenant.name} Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your organization dashboard
          </p>
        </div>

        {/* Tenant Info Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <BuildingIcon className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Organization Details</h2>
              <p className="text-sm text-muted-foreground">
                Your current workspace information
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Organization Name</span>
              <span className="text-sm">{tenant.name}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Subdomain</span>
              <Badge variant="outline" className="font-mono">
                {tenant.subdomain}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Your Access</span>
              <Badge>
                {sessionClaims?.org_role || 'Member'}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">Organization ID</span>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                {tenant.clerkOrgId}
              </code>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-3">
                <UsersIcon className="size-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">-</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500/10 p-3">
                <BuildingIcon className="size-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-sm text-muted-foreground">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-lg border bg-muted/50 p-6">
          <h3 className="font-semibold mb-2">🎉 Welcome to Your Tenant Dashboard!</h3>
          <p className="text-sm text-muted-foreground">
            This is an example dashboard page that demonstrates how to access tenant
            information using <code className="text-xs bg-background px-1 py-0.5 rounded">getCurrentTenant()</code>.
            You can build your tenant-specific features here with automatic access control
            provided by the middleware.
          </p>
        </div>
      </div>
    </div>
  );
}
