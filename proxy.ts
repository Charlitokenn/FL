import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTenantBySubdomain } from '@/lib/tenants';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  
  // Extract subdomain
  const subdomain = getSubdomain(hostname);
  
  // Get auth info
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Handle public routes (sign-in, sign-up)
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Handle admin routes - require super-admin role
  if (isAdminRoute(req)) {
    if (!userId) {
      return redirectToSignIn();
    }

    const isSuperAdmin = sessionClaims?.metadata?.role === 'super-admin';
    if (!isSuperAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  }

  // Handle subdomain routing
  if (subdomain && subdomain !== 'www' && subdomain !== 'admin') {
    // Validate tenant exists
    const tenant = await getTenantBySubdomain(subdomain);
    
    if (!tenant) {
      return NextResponse.redirect(new URL('/tenant-not-found', req.url));
    }

    // Check if user is authenticated
    if (!userId) {
      return redirectToSignIn();
    }

    // Verify user belongs to the organization
    const userOrgId = sessionClaims?.org_id;
    if (userOrgId !== tenant.clerkOrgId) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    // Add tenant info to headers for server components
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-tenant-id', tenant.id);
    requestHeaders.set('x-tenant-subdomain', tenant.subdomain);
    requestHeaders.set('x-tenant-org-id', tenant.clerkOrgId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Main domain - redirect to admin or require auth
  if (!userId) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

function getSubdomain(hostname: string): string | null {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost:3000';
  const baseDomain = appDomain.split(':')[0];
  
  // Remove port if exists
  const host = hostname.split(':')[0];
  
  // Check if this is a subdomain
  if (host.endsWith(`.${baseDomain}`)) {
    const subdomain = host.replace(`.${baseDomain}`, '');
    return subdomain;
  }
  
  return null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
