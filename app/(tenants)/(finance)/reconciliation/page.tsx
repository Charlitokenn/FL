import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Reconciliation",
  },
};

const ReconciliationPage = () => {
  return (
    <div>Reconciliation Page</div>
  )
}

export default ReconciliationPage