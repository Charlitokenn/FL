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
import { GetAllProjects, GetPaginatedProjects } from "@/lib/actions/tenants/projects.actions";
import { currencyNumber } from "@/lib/utils";
import { DataTableActionBar } from "@/components/data-table/data-table-action-bar";
import NotFound from "@/app/not-found";
import { toast } from "sonner";
  
export const ProjectsTable  = ({ data }  : { data: Project[] }) => {
    const [projectName] = useQueryState("projectName", parseAsString.withDefault(""));
    const [acquisitionDate] = useQueryState("acquisitionDate", parseAsArrayOf(parseAsString).withDefault([]));

    // Helper function to convert timestamp to YYYY-MM-DD (moved outside useMemo)
    const timestampToDateString = (timestamp: string): string => {
        const date = new Date(parseInt(timestamp));
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const filteredData = React.useMemo<Project[]>(() => {
        if (!data) return [];
        
        // Pre-convert all acquisition date timestamps once
        const dateStrings = acquisitionDate.map(timestampToDateString);
        const hasDateFilter = dateStrings.length > 0;
        const isDateRange = dateStrings.length === 2;
        
        // Sort for range comparison if needed
        if (isDateRange) dateStrings.sort();
        
        return data.filter((project: Project) => {
            // Project name filter
            if (projectName && !project?.projectName.toLowerCase().includes(projectName.toLowerCase())) {
                return false;
            }
            
            // Date filter
            if (hasDateFilter) {
                const projectDate = project?.acquisitionDate;
                if (!projectDate) return false;
                
                if (isDateRange) {
                    return projectDate >= dateStrings[0] && projectDate <= dateStrings[1];
                }
                return dateStrings.includes(projectDate);
            }
            
            return true;
        });
    }, [projectName, acquisitionDate, data]);

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
          variant: "text",
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
  const initialPageSize = 7;  
 
  const { table } = useDataTable({
    data: filteredData,
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
//   const pageIndex = table.getState().pagination.pageIndex;
//   const pageSize = table.getState().pagination.pageSize;
//   const pageCount = Math.ceil(totalRows / (pageSize || initialPageSize));
//   if (table.options.pageCount !== pageCount) {
//     table.options.pageCount = pageCount;
//   }  
 
  return (
    <div className="data-table-container">
      <DataTable
        table={table}
        actionBar={
            <DataTableActionBar table={table}>
            {/* Add your custom actions here */}
            {/* //TODO - Add action to download selected records in csv */}
            </DataTableActionBar>
        }
        >
        <DataTableToolbar table={table} />
      </DataTable>
    </div>
  );
}