import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Clients",
  },
};

const ClientsPage = () => {
  return (
    <div>Clients Page</div>
  )
}

export default ClientsPage