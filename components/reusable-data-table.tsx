"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableFilterList } from "@/components/data-table/data-table-filter-list";
import { DataTableFilterMenu } from "@/components/data-table/data-table-filter-menu";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableActionBar } from "@/components/data-table/data-table-action-bar";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableFilterField } from "@/types/data-table";

// Default configuration constants
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORTING: { id: string; desc: boolean }[] = [];
const DEFAULT_FILTER_FIELDS: DataTableFilterField<unknown>[] = [];

interface ReusableDataTableProps<TData, TValue> {
  /**
   * The data to display in the table
   */
  data: TData[];

  /**
   * Column definitions for the table
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * Total number of pages for server-side pagination
   */
  pageCount?: number;

  /**
   * Filter fields configuration for advanced filtering
   */
  filterFields?: DataTableFilterField<TData>[];

  /**
   * Initial page size (default: 10)
   */
  defaultPageSize?: number;

  /**
   * Initial sorting configuration
   */
  defaultSorting?: { id: string; desc: boolean }[];

  /**
   * Function to get unique row identifier
   */
  getRowId?: (row: TData) => string;

  /**
   * Enable row selection
   */
  enableRowSelection?: boolean;

  /**
   * Custom actions to display in the action bar when rows are selected
   */
  renderActionBarContent?: (table: ReturnType<typeof useDataTable>["table"]) => React.ReactNode;

  /**
   * Use filter menu instead of filter list (command palette style)
   */
  useFilterMenu?: boolean;

  /**
   * Show advanced toolbar (default: true)
   */
  showAdvancedToolbar?: boolean;

  /**
   * Show action bar on row selection (default: true)
   */
  showActionBar?: boolean;

  /**
   * Loading state
   */
  isLoading?: boolean;
}

export function ReusableDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  filterFields = DEFAULT_FILTER_FIELDS as DataTableFilterField<TData>[],
  defaultPageSize = DEFAULT_PAGE_SIZE,
  defaultSorting = DEFAULT_SORTING,
  getRowId,
  enableRowSelection = true,
  renderActionBarContent,
  useFilterMenu = false,
  showAdvancedToolbar = true,
  showActionBar = true,
  isLoading = false,
}: ReusableDataTableProps<TData, TValue>) {
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: defaultSorting,
      pagination: { pageSize: defaultPageSize },
    },
    getRowId,
    enableRowSelection,
  });

  const shouldShowActionBar = showActionBar && enableRowSelection;

  return (
    <div className="w-full space-y-4">
      {showAdvancedToolbar && (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          {useFilterMenu ? (
            <DataTableFilterMenu table={table} />
          ) : (
            <DataTableFilterList table={table} />
          )}
          <DataTableSortList table={table} />
        </DataTableAdvancedToolbar>
      )}

      <DataTable table={table} isLoading={isLoading} />

      {shouldShowActionBar && (
        <DataTableActionBar table={table}>
          {renderActionBarContent?.(table)}
        </DataTableActionBar>
      )}
    </div>
  );
}
