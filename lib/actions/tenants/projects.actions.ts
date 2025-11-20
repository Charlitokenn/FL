"use server"

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { desc } from "drizzle-orm";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GetAllProjects = async () => {
    try {
        await delay(1000); // 1 second delay
        
        const results = await db.select().from(projects);
        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to fetch contacts" 
        };
    }
}

export const GetPaginatedProjects = async (page: number, pageSize: number) => {
    try {
        await delay(1000); // 1 second delay
        
        const results = await db.select()
                                    .from(projects)
                                    .orderBy(desc(projects.acquisitionDate))
                                    .limit(pageSize)
                                    .offset((page - 1) * pageSize);;

        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to fetch projects" 
        };
    }
}