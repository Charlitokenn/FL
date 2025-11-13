import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Project Payments",
  },
};

const ProjectPaymentsPage = () => {
  return (
    <div>Project Payments Page</div>
  )
}

export default ProjectPaymentsPage