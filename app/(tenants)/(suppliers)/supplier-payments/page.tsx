import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Supplier Payments",
  },
};

const SupplierPaymentsPage = () => {
  return (
    <div>Supplier Payments Page</div>
  )
}

export default SupplierPaymentsPage