"use server"

import { db } from "@/database/drizzle";

export const GetAllContacts = async () => {
    try {
        const [contacts] = await db.select().from(contacts);
        return new Response(JSON.stringify({ post: onePost }));        
    } catch (error) {
        console.log("Error fetching contacts:", error);
        throw new Error("Failed to fetch contacts");
    }
}