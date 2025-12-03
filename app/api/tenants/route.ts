import { db } from "@/database/drizzle";
import { tenants } from "@/database/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name, subdomain } = await req.json();

        // Validate subdomain format
        const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "");
        if (sanitizedSubdomain !== subdomain) {
            return new NextResponse(
                "Subdomain can only contain lowercase letters, numbers, and hyphens",
                { status: 400 }
            );
        }

        // Check if subdomain is available
        const existing = await db.query.tenants.findFirst({
            where: eq(tenants.subdomain, subdomain),
        });

        if (existing) {
            return new NextResponse("Subdomain already exists", { status: 400 });
        }

        // Create tenant
        const [tenant] = await db.insert(tenants).values({
            name,
            subdomain,
            ownerId: userId,
        }).returning();

        return NextResponse.json(tenant);
    } catch (error) {
        console.error("[TENANTS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}