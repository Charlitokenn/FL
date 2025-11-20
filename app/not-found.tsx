'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const [subdomain, setSubdomain] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Extract subdomain from hostname for direct subdomain access
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        if (parts.length > 1) {
            setSubdomain(parts[0]);
        }
    }, [pathname]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {subdomain ? (
                        <>
                            <span className="text-blue-600">{subdomain}</span>{' '}
                            doesn't exist
                        </>
                    ) : (
                        'Tenant Not Found'
                    )}
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                    This tenant space hasn't been created yet.
                </p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}