import { DataTableExample } from "@/components/data-table-example";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export default async function Home () {
  const results = await db.select().from(users)
  console.log(JSON.stringify(results,null,2))

  return (
    <div className="p-4">
      <DataTableExample />
    </div>
  );
}
