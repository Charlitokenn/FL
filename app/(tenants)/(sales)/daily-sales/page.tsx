import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Sales",
  },
};

const SalesPage = () => {
  return (
    <div>Sales Page</div>
  )
}

export default SalesPage