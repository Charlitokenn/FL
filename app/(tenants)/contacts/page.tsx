import PageHero from "@/components/ui/pageHero";
import { GetAllContacts } from "@/lib/actions/tenants/contacts.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Contacts",
  },
};

const ContactsPage = async ({ sessionClaims }: { sessionClaims: any }) => {
  const { success, data, error } = await GetAllContacts();

  if (success) {
    console.log({ data });
  } else {
    console.error(error);
  }

  return (
    <section>
      <PageHero
        type="hero"
        title="Contacts"
        subtitle={`Here you can manage all contacts`}
      />
    </section>
  )
}

export default ContactsPage