import { drizzle } from "drizzle-orm/neon-http";
import config from "@/lib/config/app-config";
import { neon } from "@neondatabase/serverless";
import { GetOrgPrivateMetaData } from "@/lib/actions/admin/org.actions";

// const result  = await GetOrgPrivateMetaData();
// const databaseUrl = `postgresql://neondb_owner:${result?.db}-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
// const sql = neon(databaseUrl);

const sql = neon(config.env.databaseUrl);
export const db = drizzle({ client: sql });
