import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    //TODO - Add PWA & TESTS
    <>
      <SignedIn>        
      </SignedIn>
      <SignedOut>
        {redirect("/sign-in")}
      </SignedOut>
    </>
  );
}
