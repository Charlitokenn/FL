import { db } from "@/database/drizzle";
import { tenants, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redis, TENANT_CACHE_TTL } from "./redis";

export type Tenant = typeof tenants.$inferSelect;

const TENANT_SUBDOMAIN_KEY = (subdomain: string) => `tenant:subdomain:${subdomain}`;
const TENANT_ID_KEY = (id: string) => `tenant:id:${id}`;
const TENANT_ORG_KEY = (orgId: string) => `tenant:org:${orgId}`;

export async function getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    if (!subdomain) return null;

    // Check Redis cache first
    const cacheKey = TENANT_SUBDOMAIN_KEY(subdomain);
    const cached = await redis.get<Tenant>(cacheKey);
    if (cached) return cached;

    // Fetch from database
    const tenant = await db.select().from(tenants).where(eq(tenants.subdomain, subdomain));
    const result = tenant[0] || null;

    // Cache result if found
    if (result) {
        await redis.setex(cacheKey, TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_ID_KEY(result.id), TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_ORG_KEY(result.clerkOrgId), TENANT_CACHE_TTL, result);
    }

    return result;
}

export async function getTenantById(id: string): Promise<Tenant | null> {
    if (!id) return null;

    // Check Redis cache first
    const cacheKey = TENANT_ID_KEY(id);
    const cached = await redis.get<Tenant>(cacheKey);
    if (cached) return cached;

    // Fetch from database
    const tenant = await db.select().from(tenants).where(eq(tenants.id, id));
    const result = tenant[0] || null;

    // Cache result if found
    if (result) {
        await redis.setex(cacheKey, TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_SUBDOMAIN_KEY(result.subdomain), TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_ORG_KEY(result.clerkOrgId), TENANT_CACHE_TTL, result);
    }

    return result;
}

export function sanitizeSubdomain(subdomain: string): string {
    return subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export function validateSubdomain(subdomain: string): boolean {
    const sanitized = sanitizeSubdomain(subdomain);
    return sanitized === subdomain && subdomain.length >= 3 && subdomain.length <= 63;
}

export async function getTenantByOrgId(orgId: string): Promise<Tenant | null> {
    if (!orgId) return null;

    // Check Redis cache first
    const cacheKey = TENANT_ORG_KEY(orgId);
    const cached = await redis.get<Tenant>(cacheKey);
    if (cached) return cached;

    // Fetch from database
    const tenant = await db.select().from(tenants).where(eq(tenants.clerkOrgId, orgId));
    const result = tenant[0] || null;

    // Cache result if found
    if (result) {
        await redis.setex(cacheKey, TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_ID_KEY(result.id), TENANT_CACHE_TTL, result);
        await redis.setex(TENANT_SUBDOMAIN_KEY(result.subdomain), TENANT_CACHE_TTL, result);
    }

    return result;
}

export async function invalidateTenantCache(tenant: Tenant): Promise<void> {
    await redis.del(
        TENANT_ID_KEY(tenant.id),
        TENANT_SUBDOMAIN_KEY(tenant.subdomain),
        TENANT_ORG_KEY(tenant.clerkOrgId)
    );
}
