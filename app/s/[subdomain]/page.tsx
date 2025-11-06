import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Metadata for SEO
export async function generateMetadata({
    params
}: {
    params: { subdomain: string };
}): Promise<Metadata> {
    return {
        title: `${params.subdomain} - Tenant Space`,
        description: `Welcome to ${params.subdomain}'s tenant space`
    };
}

export default async function SubdomainPage({
    params
}: {
    params: { subdomain: string };
}) {
 
    // Here you would typically fetch tenant-specific data
    // For example:
    // const tenant = await db.query.tenants.findFirst({
    //   where: eq(tenants.subdomain, params.subdomain)
    // });

    // if (!tenant) {
    //   notFound();
    // }

    return (
        <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white p-4">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Welcome to {params.subdomain}'s Space
                    </h1>
                </div>
            </div>
        </div>
    );
}
