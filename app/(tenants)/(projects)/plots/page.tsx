import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Plots",
  },
};

const PlotsPage = () => {
  return (
    <div>Plots Page</div>
  )
}

export default PlotsPage