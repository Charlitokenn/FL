import { DataTableExample } from "@/components/data-table-example";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <>
      <SignedIn>
        <div className="p-4">
          <DataTableExample />
        </div>
      </SignedIn>
      <SignedOut>
        {redirect("/sign-in")}
      </SignedOut>
    </>
  );
}
