import { Button } from '@/components/ui/button';
import { BuildingIcon } from 'lucide-react';
import Link from 'next/link';

export default function TenantNotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <BuildingIcon className="size-12 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Organization Not Found</h1>
          <p className="text-muted-foreground">
            The organization you're trying to access doesn't exist or has been removed.
            Please check the URL and try again.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
