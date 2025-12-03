"use server"

import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";

export const GetAllProjects = async () => {
    try {
        const results = await db.select()
            .from(projects)
            .where(eq(projects.isDeleted, false));

        return { success: true, data: results };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch projects"
        };
    }
}

export const SoftDeleteProjects = async (ids: string[]) => {
    try {
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