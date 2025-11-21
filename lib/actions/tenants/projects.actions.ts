"use server"

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GetAllProjects = async () => {
    try {
        await delay(10000); // 1 second delay
        
        const results = await db.select()
                                .from(projects)
                                .where(eq(projects.isDeleted, false));

        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to fetch contacts" 
        };
    }
}

export const SoftDeleteProjects = async (ids : string[]) => {
    try {
        await delay(1000); // 1 second delay
        
        const results = await db.update(projects)
                                .set({ isDeleted: true })
                                .where(inArray(projects.id, ids))
                                .returning();
        
        return { success: true, data: results };
    } catch (error) {
        console.error("Error deleting projects:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to delete project" 
        };
    }
}