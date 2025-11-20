"use client";
 
import type { Column, ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  CheckCircle2,
  DollarSign,
  MoreHorizontal,
  Text,
  XCircle,
} from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDate } from "@/lib/format";
import { useDebounce } from "use-debounce";
import { db } from "@/database/drizzle";
import { projects } from "@/database/schema";
import { desc } from "drizzle-orm";
import { GetPaginatedProjects } from "@/lib/actions/tenants/projects.actions";
import { currencyNumber } from "@/lib/utils";
  
export function ProjectsTable() {
  const [data, setData] = React.useState<Project[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);

  // Debounce the filter value (wait 300ms after user stops typing)
  const [project] = useQueryState("projectName", parseAsString.withDefault(""));
  const [debouncedProjectName] = useDebounce(project, 300);    

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "acquisitionDate",
        accessorKey: "acquisitionDate",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Acquisition Date" />
        ),
        cell: ({ cell }) => (
          <div>{formatDate(cell.getValue<Project["acquisitionDate"]>())}</div>
        ),
        meta: {
          label: "Date Filter",
          placeholder: "Filter Date...",
          variant: "dateRange",
          icon: Text,
          searchable: true,
        },
        enableColumnFilter: true,
        enableHiding: false,
      },
      {
        id: "projectName",
        accessorKey: "projectName",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Project Name" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Project["projectName"]>()}</div>,
        meta: {
          label: "Project Name",
          placeholder: "Search Project...",
          variant: "multiSelect",
          icon: Text,
          searchable: true,
        },
        enableColumnFilter: true,
        enableHiding: false,
      },
      {
        id: "acquisitionValue",
        accessorKey: "acquisitionValue",
        header: ({ column }: { column: Column<Project, unknown> }) => (
          <DataTableColumnHeader column={column} label="Acquisition Value" />
        ),
        cell: ({ cell }) => {
          const acquisitionValue = cell.getValue<Project["acquisitionValue"]>();
 
          return (
            <div className="flex items-center gap-1">
              {currencyNumber(acquisitionValue)}
            </div>
          );          
        },
        meta: {
          label: "Acquisition Value",
          placeholder: "Acquisiton Value...",
          variant: "range",
          icon: Text,
          searchable: true,
        },        
        enableColumnFilter: true,
        enableHiding: true,        
      },
      {
        id: "actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    [],
  );

  // Temporary pageSize for initial calculation
  const initialPageSize = 10;  
 
  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1, // Will be updated below
    initialState: {
      sorting: [{ id: "acquisitionDate", desc: false }],
      columnPinning: { right: ["actions"] },
      pagination: {
        pageSize: initialPageSize,
        pageIndex: 0,
      },
    },
    getRowId: (row) => row.id,
  });

  // Now that table is defined, calculate pageCount and update table.options.pageCount if needed
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = Math.ceil(totalRows / (pageSize || initialPageSize));
  if (table.options.pageCount !== pageCount) {
    table.options.pageCount = pageCount;
  }  

  // Fetch paginated data from Neon Database
  React.useEffect(() => {    
    const fetchPage = async (page = 1, pageSize = 10) => {
      const {data, error} = await GetPaginatedProjects(page, pageSize)
        console.log({data})
      if (error) {
        console.error("Database fetch error:", error);
      } else {
        setData(data);
        setTotalRows(count || 0);
      }
    };
    fetchPage();
  }, [debouncedProjectName, pageIndex, pageSize]);

 
  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}