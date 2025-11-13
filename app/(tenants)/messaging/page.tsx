import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Messaging",
  },
};

const MessagingPage = () => {
  return (
    <div>Messaging Page</div>
  )
}

export default MessagingPage