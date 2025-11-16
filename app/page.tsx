import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <>
      <SignedIn>        
      </SignedIn>
      <SignedOut>
        {redirect("/sign-in")}
      </SignedOut>
    </>
  );
}
