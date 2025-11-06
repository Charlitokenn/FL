'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createTenantWithOrganization } from '@/app/actions/tenant-actions';
import { PlusIcon, LoaderCircleIcon } from 'lucide-react';

export function CreateTenantForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    organizationName: '',
    subdomain: '',
    ownerEmail: '',
    ownerFirstName: '',
    ownerLastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await createTenantWithOrganization(formData);

    if (result.success) {
      setOpen(false);
      setFormData({
        organizationName: '',
        subdomain: '',
        ownerEmail: '',
        ownerFirstName: '',
        ownerLastName: '',
      });
    } else {
      setError(result.error || 'Failed to create tenant');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
          <DialogDescription>
            Create a new organization with a subdomain and owner account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="organizationName" className="text-sm font-medium">
              Organization Name
            </label>
            <Input
              id="organizationName"
              placeholder="Acme Corporation"
              value={formData.organizationName}
              onChange={(e) =>
                setFormData({ ...formData, organizationName: e.target.value })
              }
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subdomain" className="text-sm font-medium">
              Subdomain
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                placeholder="acme"
                value={formData.subdomain}
                onChange={(e) =>
                  setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })
                }
                required
              />
              <span className="text-sm text-muted-foreground">.yourdomain.com</span>
            </div>
            <p className="text-xs text-muted-foreground">
              3-63 characters, lowercase letters, numbers, and hyphens only
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Owner Information</h4>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label htmlFor="ownerFirstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="ownerFirstName"
                    placeholder="John"
                    value={formData.ownerFirstName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerFirstName: e.target.value })
                    }
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="ownerLastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="ownerLastName"
                    placeholder="Doe"
                    value={formData.ownerLastName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerLastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="ownerEmail" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="ownerEmail"
                  type="email"
                  placeholder="john@acme.com"
                  value={formData.ownerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerEmail: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <LoaderCircleIcon className="animate-spin" />}
              Create Organization
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
