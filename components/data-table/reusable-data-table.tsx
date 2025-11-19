'use client'

import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar";
import { DataTableFilterList } from "@/components/data-table/data-table-filter-list";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { useDataTable } from "@/hooks/use-data-table";

interface Props {
    data: any[];
    columns: any[];
    pageCount: number;
}

export const ReusableDataTable = ({ data, columns, pageCount }: Props) =>{
    const { table } = useDataTable({
        data,
        columns,
        pageCount
    });
    return (
        <DataTable table={table}>
            <DataTableToolbar table={table}>
            <DataTableSortList table={table} />
        </DataTableToolbar>
        </DataTable>
    )
}

export const ReusableAdvancedDataTable = ({ data, columns, pageCount }: Props) =>{
    const { table } = useDataTable({
        data,
        columns,
        pageCount
    });
    return (
        <DataTable table={table}>
            <DataTableAdvancedToolbar table={table}>
                <DataTableFilterList table={table} />
                <DataTableSortList table={table} />
            </DataTableAdvancedToolbar>
        </DataTable>
    )
}



