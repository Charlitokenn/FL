import PageHero from "@/components/ui/pageHero";
import { GetAllContacts } from "@/lib/actions/contacts/contacts.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Contacts",
  },
};

const ContactsPage = async ({ sessionClaims }:{ sessionClaims: any}) => {
  const contacts = await GetAllContacts()
  console.log({contacts})

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