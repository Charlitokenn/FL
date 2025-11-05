"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { 
  Text, 
  CalendarIcon, 
  DollarSign, 
  Hash,
  CheckCircle2,
  Circle,
  AlertCircle,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ReusableDataTable } from "@/components/reusable-data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formatCurrency } from "@/lib/format";
import type { DataTableFilterField } from "@/types/data-table";

// Example data type
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  category: string;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}

// Status configuration
const statusConfig = {
  pending: {
    label: "Pending",
    icon: Circle,
    variant: "default" as const,
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    variant: "success" as const,
  },
  failed: {
    label: "Failed",
    icon: AlertCircle,
    variant: "destructive" as const,
  },
};

// Priority configuration
const priorityConfig = {
  low: { label: "Low", variant: "outline" as const },
  medium: { label: "Medium", variant: "default" as const },
  high: { label: "High", variant: "destructive" as const },
};

export function DataTableExample() {
  // Example data
  const data: Transaction[] = React.useMemo(
    () => [
      {
        id: "1",
        title: "Office Supplies",
        amount: 250.50,
        status: "completed",
        category: "Office",
        createdAt: new Date("2024-01-15"),
        priority: "low",
      },
      {
        id: "2",
        title: "Software License",
        amount: 1200.00,
        status: "pending",
        category: "Software",
        createdAt: new Date("2024-01-20"),
        priority: "high",
      },
      {
        id: "3",
        title: "Travel Expenses",
        amount: 850.75,
        status: "failed",
        category: "Travel",
        createdAt: new Date("2024-01-18"),
        priority: "medium",
      },
    ],
    []
  );

  // Column definitions with comprehensive metadata
  const columns = React.useMemo<ColumnDef<Transaction>[]>(
    () => [
      // Selection column
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        enableSorting: false,
        enableHiding: false,
      },
      // Text column with filtering
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("title")}</div>
        ),
        meta: {
          label: "Title",
          placeholder: "Search titles...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      // Number column with range filtering
      {
        id: "amount",
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <div className="font-mono">
            {formatCurrency(row.getValue("amount"))}
          </div>
        ),
        meta: {
          label: "Amount",
          variant: "range",
          icon: DollarSign,
          min: 0,
          max: 10000,
        },
        enableColumnFilter: true,
      },
      // Select column with options
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as keyof typeof statusConfig;
          const config = statusConfig[status];
          const Icon = config.icon;

          return (
            <Badge variant={config.variant}>
              <Icon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          );
        },
        meta: {
          label: "Status",
          variant: "select",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
            { label: "Failed", value: "failed" },
          ],
        },
        enableColumnFilter: true,
        filterFn: (row, id, value) => {
          return Array.isArray(value) && value.includes(row.getValue(id));
        },
      },
      // Category select column
      {
        id: "category",
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => (
          <Badge variant="outline">{row.getValue("category")}</Badge>
        ),
        meta: {
          label: "Category",
          variant: "select",
          options: [
            { label: "Office", value: "Office" },
            { label: "Software", value: "Software" },
            { label: "Travel", value: "Travel" },
          ],
        },
        enableColumnFilter: true,
        filterFn: (row, id, value) => {
          return Array.isArray(value) && value.includes(row.getValue(id));
        },
      },
      // Date column with date filtering
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">
            {formatDate(row.getValue("createdAt"))}
          </div>
        ),
        meta: {
          label: "Created At",
          variant: "date",
          icon: CalendarIcon,
        },
        enableColumnFilter: true,
      },
      // Priority select column
      {
        id: "priority",
        accessorKey: "priority",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
          const priority = row.getValue("priority") as keyof typeof priorityConfig;
          const config = priorityConfig[priority];

          return (
            <Badge variant={config.variant}>
              {config.label}
            </Badge>
          );
        },
        meta: {
          label: "Priority",
          variant: "select",
          options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ],
        },
        enableColumnFilter: true,
        filterFn: (row, id, value) => {
          return Array.isArray(value) && value.includes(row.getValue(id));
        },
      },
      // Actions column
      {
        id: "actions",
        cell: ({ row }) => {
          const transaction = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(transaction.id)}
                >
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  // Filter fields configuration
  const filterFields: DataTableFilterField<Transaction>[] = [
    {
      id: "title",
      label: "Title",
      placeholder: "Search titles...",
    },
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" },
      ],
    },
    {
      id: "category",
      label: "Category",
      options: [
        { label: "Office", value: "Office" },
        { label: "Software", value: "Software" },
        { label: "Travel", value: "Travel" },
      ],
    },
    {
      id: "priority",
      label: "Priority",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
  ];

  return (
    <ReusableDataTable
      data={data}
      columns={columns}
      filterFields={filterFields}
      defaultPageSize={10}
      defaultSorting={[{ id: "createdAt", desc: true }]}
      getRowId={(row) => row.id}
      enableRowSelection
      useFilterMenu={false} // Set to true for command palette style
      renderActionBarContent={(table) => (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const selectedRows = table.getFilteredSelectedRowModel().rows;
              console.log("Delete", selectedRows.length, "items");
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        </>
      )}
    />
  );
}
