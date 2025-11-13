import { TenantSidebar } from "@/components/ui/admin-sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const { sessionClaims } = await auth();
const isAdmin = sessionClaims?.o?.rol === 'admin' || sessionClaims?.o?.rol === 'super_admin';

  return (
    <SidebarProvider>
      <TenantSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b sticky top-0 z-50 bg-background">
          <div className="flex flex-1 items-center gap-2 px-6">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {/* {(() => {
                      const matchedIcon = iconArray.find((item) =>
                        pathname.startsWith(item.url)
                      );
                      if (matchedIcon && matchedIcon.icon) {
                        return <IconRenderer name={matchedIcon.icon}/>
                      }
                      return null;
                    })()} */}
                    <span className="sr-only">Dashboard</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  {/* <BreadcrumbPage>{toProperCase(path)}</BreadcrumbPage> */}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex gap-3 ml-auto px-6">
            {isAdmin && <OrganizationSwitcher hidePersonal/>}            
            <UserButton />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
