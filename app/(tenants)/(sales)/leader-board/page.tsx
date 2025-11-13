import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Leader Board",
  },
};

const LeaderBoardPage = () => {
  return (
    <div>Leader Board Page</div>
  )
}

export default LeaderBoardPage