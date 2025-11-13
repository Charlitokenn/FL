import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Statement",
  },
};

const ClientStatementPage = () => {
  return (
    <div>Client Statement Page</div>
  )
}

export default ClientStatementPage