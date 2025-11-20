import PageHero from "@/components/ui/pageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Clients",
  },
};

const ClientsPage = () => {
  return (
    <section>
      <PageHero
        type="hero"
        title="Clients"
        subtitle={`Here you can manage your clients `}
      />
    </section>
  )
}

export default ClientsPage