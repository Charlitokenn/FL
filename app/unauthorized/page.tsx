import { Button } from '@/components/ui/button';
import { ShieldAlertIcon } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlertIcon className="size-12 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this resource. Please contact your
            administrator if you believe this is an error.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
