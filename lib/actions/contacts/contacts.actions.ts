"use server"

import { db } from "@/database/drizzle";
import { contacts } from "@/database/schema";
import type { InferSelectModel } from 'drizzle-orm';

type Contact = InferSelectModel<typeof contacts>;

export const GetAllContacts = async () => {
    try {
        const results = await db.select().from(contacts);
        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to fetch contacts" 
        };
    }
}