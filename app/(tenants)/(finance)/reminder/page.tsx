import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Reminder",
  },
};

const ReminderPage = () => {
  return (
    <div>Reminder Page</div>
  )
}

export default ReminderPage