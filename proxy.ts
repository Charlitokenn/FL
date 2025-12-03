import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rootDomain } from '@/lib/utils';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)',]);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
//TODO - Add dynamic org switching while login & dynamicdatabase/project switchings
export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const subdomain = extractSubdomain(req);
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (subdomain) {
    const userOrgSlug = sessionClaims?.o?.slg;

    // For public routes on subdomains, allow them (don't redirect)
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // For protected routes, require auth + matching org
    if (!userId) {
      return redirectToSignIn();
    }

    if (userOrgSlug !== subdomain) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, req.url));
    }

    return NextResponse.next();
  }

  // Root domain logic stays the same
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (isAdminRoute(req)) {
    if (!userId) return redirectToSignIn();
    if (sessionClaims?.o?.rol !== 'super_admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next();
  }

  if (!userId) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.:]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};