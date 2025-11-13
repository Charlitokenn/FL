import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Suppliers",
  },
};

const SuppliersPage = () => {
  return (
    <div>Suppliers Page</div>
  )
}

export default SuppliersPage