"use server"

import { db } from "@/database/drizzle";
import { contacts } from "@/database/schema";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GetAllContacts = async () => {
    try {
        await delay(1000); // 1 second delay
        
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