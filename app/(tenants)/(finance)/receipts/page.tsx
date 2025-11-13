import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Receipts",
  },
};

const ReceiptsPage = () => {
  return (
    <div>Receipts Page</div>
  )
}

export default ReceiptsPage