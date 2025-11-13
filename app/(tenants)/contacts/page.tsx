import PageHero from "@/components/ui/pageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Contacts",
  },
};

const ContactsPage = ({ sessionClaims }:{ sessionClaims: any}) => {
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