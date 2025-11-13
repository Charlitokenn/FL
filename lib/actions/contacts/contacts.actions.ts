"use server"

import { db } from "@/database/drizzle";
import { contacts } from "@/database/schema";

export const GetAllContacts = async () => {
    try {
        const results = await db.select().from(contacts);
        return results //new Response(JSON.stringify({ res: results }));        
    } catch (error) {
        console.log("Error fetching contacts:", error);
        
    }
}