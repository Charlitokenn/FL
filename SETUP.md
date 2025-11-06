# Multitenant SaaS Setup Guide

This is a comprehensive guide for setting up and running your multitenant SaaS application built with Next.js, Clerk, Neon DB, Drizzle ORM, and Upstash Redis.

## Architecture Overview

- **Authentication & Organizations**: Clerk handles user authentication and organization management
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Caching**: Upstash Redis for tenant domain info and performance
- **Subdomain Routing**: Next.js middleware handles subdomain-based tenant routing
- **Access Control**: Super-admin role for admin dashboard, organization-based access for tenants

## Prerequisites

- Node.js 18+ installed
- A Clerk account (https://clerk.com)
- A Neon database (https://neon.tech)
- An Upstash Redis instance (https://upstash.com)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Clerk

1. Go to https://dashboard.clerk.com and create a new application
2. Enable Organizations in Clerk Dashboard:
   - Go to **Configure** → **Organizations**
   - Enable organization feature
3. Create a super-admin user:
   - Go to **Users** → Select your user
   - Add metadata: `{ "role": "super-admin" }`
4. Copy your API keys

### 3. Configure Neon Database

1. Go to https://console.neon.tech
2. Create a new project or use existing one
3. Copy your connection string

### 4. Configure Upstash Redis

1. Go to https://console.upstash.com
2. Create a new Redis database
3. Copy the REST URL and token

### 5. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Neon Database
DATABASE_URL=postgresql://user:password@host/database

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Application Configuration
NEXT_PUBLIC_APP_DOMAIN=localhost:3000
NEXT_PUBLIC_APP_PROTOCOL=http
```

### 6. Push Database Schema

```bash
npm run db:push
```

Or generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 7. Run Development Server

```bash
npm run dev
```

## Usage Guide

### Admin Dashboard Access

1. Sign in with your super-admin account
2. Navigate to `/admin`
3. You'll see the admin dashboard where you can:
   - Create new organizations
   - Set up subdomains
   - Add users to organizations

### Creating a New Tenant

1. Go to `/admin`
2. Click "Create Organization"
3. Fill in:
   - Organization name
   - Subdomain (3-63 characters, lowercase)
   - Owner information (first name, last name, email)
4. Click "Create Organization"

This will:
- Create a Clerk organization
- Create a database tenant record
- Cache tenant info in Redis
- Create or invite the owner user

### Adding Users to Organizations

1. In the admin dashboard, find the organization
2. Click "Add User" button
3. Enter user details:
   - First name, last name, email
   - Role (Admin or Member)
4. Click "Add User"

### Subdomain Access

After creating a tenant with subdomain `acme`:

**Development:**
- You'll need to use a local domain setup or edit your hosts file
- Add to `/etc/hosts` (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
  ```
  127.0.0.1 acme.localhost
  ```
- Access at: `http://acme.localhost:3000`

**Production:**
- Set up DNS wildcard record: `*.yourdomain.com` → your app's IP/domain
- Users access their tenant at: `https://acme.yourdomain.com`

### Access Control

**Super Admin:**
- Can access `/admin` route
- Manage all organizations and users
- Set in Clerk user metadata: `{ "role": "super-admin" }`

**Organization Members:**
- Can only access their organization's subdomain
- Must be member of the organization in Clerk
- Automatically routed based on organization membership

## Key Features

### 1. Subdomain-Based Multitenancy
- Each organization gets a unique subdomain
- Middleware validates tenant and user access
- Tenant info passed via headers to server components

### 2. Redis Caching
- Tenant data cached for 24 hours
- Automatic cache invalidation on updates
- Multiple cache keys (by ID, subdomain, org ID)

### 3. Security
- Middleware enforces authentication
- Organization membership validation
- Super-admin role for admin routes
- Database-level tenant isolation possible

### 4. Clerk Integration
- Organizations managed in Clerk
- User authentication and session management
- Public metadata for subdomain and roles
- Organization membership with roles

## API Reference

### Server Actions

#### `createTenantWithOrganization(input)`
Creates a new organization, tenant, and owner user.

**Input:**
```typescript
{
  organizationName: string;
  subdomain: string;
  ownerEmail: string;
  ownerFirstName: string;
  ownerLastName: string;
}
```

#### `addUserToOrganization(input)`
Adds a user to an existing organization.

**Input:**
```typescript
{
  organizationId: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: 'org:admin' | 'org:member';
}
```

#### `listAllTenants()`
Returns all tenants (super-admin only).

### Helper Functions

#### `getCurrentTenant()`
Gets current tenant from request headers (use in server components).

#### `getTenantHeaders()`
Gets tenant metadata from request headers.

#### `getTenantBySubdomain(subdomain)`
Fetches tenant by subdomain (with Redis caching).

## Database Schema

### Tenants Table
```typescript
{
  id: uuid (primary key)
  name: string
  subdomain: string (unique)
  clerkOrgId: string (unique)
  ownerId: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Troubleshooting

### Issue: Middleware infinite redirect
**Solution**: Ensure your user has the correct role in Clerk metadata and you're signed in.

### Issue: Subdomain not working locally
**Solution**: Edit your hosts file or use a tool like `localhost.run` for testing.

### Issue: Redis connection error
**Solution**: Verify UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are correct.

### Issue: Database connection failed
**Solution**: Check DATABASE_URL format and network access in Neon dashboard.

## Production Deployment

1. **Environment Variables**: Set all production environment variables
2. **Database**: Run migrations in production
3. **DNS**: Configure wildcard DNS (`*.yourdomain.com`)
4. **SSL**: Ensure SSL certificates cover wildcard domain
5. **Clerk**: Update allowed domains in Clerk dashboard

## Next Steps

- Implement tenant-specific data isolation in queries
- Add billing/subscription management
- Create tenant settings page
- Add analytics and monitoring
- Implement rate limiting per tenant
- Add custom domain support

## Support

For issues or questions, refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Upstash Redis Docs](https://docs.upstash.com/redis)
