import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Projects",
  },
};

const ProjectsPage = () => {
  return (
    <div>Projects Page</div>
  )
}

export default ProjectsPage