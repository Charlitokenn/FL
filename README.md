# FlowLedger - Multitenant SaaS

A production-ready multitenant SaaS application built with Next.js 16, featuring subdomain-based routing, organization management, and enterprise-grade authentication.

## 🚀 Features

- ✅ **Subdomain-Based Multitenancy** - Each organization gets their own subdomain
- ✅ **Clerk Authentication** - Enterprise-grade auth with organization support
- ✅ **Redis Caching** - Fast tenant lookup and data caching
- ✅ **Type-Safe Database** - Drizzle ORM with PostgreSQL
- ✅ **Admin Dashboard** - Manage organizations and users
- ✅ **Role-Based Access** - Super-admin and organization-level permissions
- ✅ **Clean Architecture** - Maintainable and scalable codebase

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Get up and running in minutes |
| [SETUP.md](./SETUP.md) | Detailed setup instructions |
| [CLERK_SETUP.md](./CLERK_SETUP.md) | Clerk configuration and metadata setup |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Architecture and code organization |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | What's been built and how it works |

## 🏃 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local
# Then fill in your Clerk, Neon, and Upstash credentials

# 3. Push database schema
npm run db:push

# 4. Start development server
npm run dev
```

**Then:**
1. Sign up and set yourself as super-admin in Clerk Dashboard
2. Visit `http://localhost:3000/admin` to create organizations
3. Edit hosts file to test subdomains locally

See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle
- **Caching**: Upstash Redis
- **UI**: Radix UI + Tailwind CSS
- **Language**: TypeScript

## 🔑 Key Features

### Subdomain Routing
Each organization automatically gets a subdomain:
```
acme.yourdomain.com → Acme Corp dashboard
```

### Admin Dashboard
Super-admins can:
- Create organizations with custom subdomains
- Add users to organizations
- Manage organization settings

### Tenant Context
Easily access tenant data in server components:
```typescript
import { getCurrentTenant } from '@/lib/tenant-context';

export default async function MyPage() {
  const tenant = await getCurrentTenant();
  // Use tenant.id to filter data
}
```

## 📦 Environment Variables

Required environment variables (see `.env.example`):

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Neon Database
DATABASE_URL=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App Configuration
NEXT_PUBLIC_APP_DOMAIN=localhost:3000
```

## 🧪 Development

```bash
# Run development server
npm run dev

# Check types
npm run build

# Database operations
npm run db:push      # Push schema changes
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio
```

## 🚀 Deployment

See [SETUP.md](./SETUP.md) for production deployment details.

---

**Need help?** Check out the [QUICKSTART.md](./QUICKSTART.md) guide!

**Ready to build?** Start with `npm run dev` and visit `/admin`!
