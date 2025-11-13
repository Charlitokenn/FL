import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Contacts",
  },
};

const ContactsPage = () => {
  return (
    <div>Contacts Page</div>
  )
}

export default ContactsPage