import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Debtor Aging",
  },
};

const DebtorAgingPage = () => {
  return (
    <div>Debtor Aging Page</div>
  )
}

export default DebtorAgingPage