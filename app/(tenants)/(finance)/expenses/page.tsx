import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Expenses",
  },
};

const ExpensesPage = () => {
  return (
    <div>Expenses Page</div>
  )
}

export default ExpensesPage