import { ReusableDataTable } from "@/components/data-table/reusable-data-table";
import PageHero from "@/components/ui/pageHero";
import { GetAllProjects } from "@/lib/actions/tenants/projects.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | FlowLedger",
    default: "Projects",
  },
};

const ProjectsPage = async () => {
  const { data } = await GetAllProjects();

    const columns = [
    {
      id: "project_name",
      accessorKey: "project_name",
      header: "Project Name",
    },
    {
      id: "project_details",
      accessorKey: "project_details",
      header: "Project Details",
    },
  ];
  return (
    <section>
      <PageHero
        type="hero"
        title="Projects"
        subtitle={`Here you can manage all your projects `}
        showButton
        buttonText="New Project"
      />
     <ReusableDataTable data={data ?? []} pageCount={10} columns={columns} />
    </section>
  )
}

export default ProjectsPage