import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";

// Ensure this secret exists in your environment (.env.local)
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // 1️⃣ Validate that the secret exists
  if (!CLERK_WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET env variable");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // 2️⃣ Extract svix headers (used by Clerk to sign webhook requests)
  const headerList = headers();
  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
  }

  // 3️⃣ Get the raw body text for signature verification
  const payload = await req.text();

  // 4️⃣ Verify the request signature using Svix
  const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = webhook.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 5️⃣ Handle different event types
  const { type, data } = event;

  switch (type) {
    case "user.created":
      console.log("✅ User created:", data.id, data.email_addresses[0]?.email_address);
      // TODO: Create a user record in your database
      break;

    case "user.updated":
      console.log("🔄 User updated:", data.id);
      // TODO: Sync metadata or user info in your database
      break;

    case "user.deleted":
      console.log("❌ User deleted:", data.id);
      // TODO: Remove or deactivate user in your database
      break;

    default:
      console.log(`ℹ️ Unhandled Clerk event: ${type}`);
  }

  // 6️⃣ Respond to Clerk quickly (must be <5s)
  return NextResponse.json({ success: true }, { status: 200 });
}
