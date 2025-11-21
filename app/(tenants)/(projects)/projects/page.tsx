import PageHero from "@/components/ui/pageHero";
import { GetAllProjects } from "@/lib/actions/tenants/projects.actions";
import { Metadata } from "next";
import { ProjectsTable } from "./columns"
import AddContactForm from "@/components/forms/contacts-form";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Projects",
  },
};

const ProjectsPage = async () => {
  const results = await GetAllProjects();

  return (
    <section>
      <PageHero
        type="hero"
        title="Projects"
        subtitle={`Here you can manage all your projects `}
        showButton
        buttonText="New Project"
        dialogTitle="New Project"
        dialog={<p>Am the content</p>}
      />
      <ProjectsTable data={results.data ?? []}/>
    </section>
  )
}

export default ProjectsPage