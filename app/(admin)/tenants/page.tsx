import PageHero from '@/components/ui/pageHero'
import { GetAllContacts } from '@/lib/actions/contacts/contacts.actions';

const TenantsPage = async () => {
  const {data} = await GetAllContacts()
  const columns = [
    {
      id: "fullName",
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      id: "mobileNumber",
      accessorKey: "mobileNumber",
      header: "Mobile Number",
    },
    {
      id: "idType",
      accessorKey: "idType",
      header: "Id Type",
    },
  ];
  return (
    <section>
      <PageHero
        type="hero"
        title="Tenants"
        subtitle={`Here you can view and manage tenants`}
      />
    </section>
    
  )
}

export default TenantsPage