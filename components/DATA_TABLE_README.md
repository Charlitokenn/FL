# Reusable Data Table

A comprehensive, feature-rich data table component built with Dice UI that supports sorting, filtering, pagination, and bulk actions.

## Features

- ✅ **Sorting** - Click column headers to sort (single and multi-column)
- ✅ **Filtering** - Multiple filter types: text, select, date, and range
- ✅ **Pagination** - Built-in pagination controls
- ✅ **Row Selection** - Select individual or all rows with checkboxes
- ✅ **Action Bar** - Floating action bar for bulk operations
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Type-safe** - Full TypeScript support
- ✅ **URL State** - Filter and sort state persisted in URL

## Installation

Already installed! The following components are available:

- `ReusableDataTable` - Main wrapper component
- `DataTableExample` - Comprehensive example with all features

## Basic Usage

```tsx
import { ReusableDataTable } from "@/components/reusable-data-table";

function MyTable() {
  const data = [
    { id: "1", name: "John", age: 25 },
    { id: "2", name: "Jane", age: 30 },
  ];

  const columns = [
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "age",
      accessorKey: "age",
      header: "Age",
    },
  ];

  return <ReusableDataTable data={data} columns={columns} />;
}
```

## Column Definitions

Columns support various filter types through metadata:

### Text Filter

```tsx
{
  id: "title",
  accessorKey: "title",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Title" />
  ),
  meta: {
    label: "Title",
    placeholder: "Search titles...",
    variant: "text",
    icon: Text,
  },
  enableColumnFilter: true,
}
```

### Select Filter (Dropdown)

```tsx
{
  id: "status",
  accessorKey: "status",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Status" />
  ),
  meta: {
    label: "Status",
    variant: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  enableColumnFilter: true,
  filterFn: (row, id, value) => {
    return Array.isArray(value) && value.includes(row.getValue(id));
  },
}
```

### Date Filter

```tsx
{
  id: "createdAt",
  accessorKey: "createdAt",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Created At" />
  ),
  meta: {
    label: "Created At",
    variant: "date",
    icon: CalendarIcon,
  },
  enableColumnFilter: true,
}
```

### Range Filter (Numbers)

```tsx
{
  id: "amount",
  accessorKey: "amount",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Amount" />
  ),
  meta: {
    label: "Amount",
    variant: "range",
    icon: DollarSign,
    min: 0,
    max: 10000,
  },
  enableColumnFilter: true,
}
```

## Props

### ReusableDataTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | required | Array of data to display |
| `columns` | `ColumnDef<TData>[]` | required | Column definitions |
| `pageCount` | `number` | - | Total pages for server-side pagination |
| `filterFields` | `DataTableFilterField[]` | `[]` | Filter configuration |
| `defaultPageSize` | `number` | `10` | Initial rows per page |
| `defaultSorting` | `SortingState` | `[]` | Initial sort configuration |
| `getRowId` | `(row) => string` | - | Function to get unique row ID |
| `enableRowSelection` | `boolean` | `true` | Enable row selection checkboxes |
| `renderActionBarContent` | `(table) => ReactNode` | - | Custom actions for selected rows |
| `useFilterMenu` | `boolean` | `false` | Use command palette style filters |
| `showAdvancedToolbar` | `boolean` | `true` | Show toolbar with filters |
| `showActionBar` | `boolean` | `true` | Show action bar on selection |
| `isLoading` | `boolean` | `false` | Display skeleton loading state |

## Advanced Features

### Row Selection with Actions

```tsx
<ReusableDataTable
  data={data}
  columns={columns}
  enableRowSelection
  renderActionBarContent={(table) => (
    <Button
      onClick={() => {
        const selected = table.getFilteredSelectedRowModel().rows;
        console.log("Delete", selected.length, "items");
      }}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      Delete ({table.getFilteredSelectedRowModel().rows.length})
    </Button>
  )}
/>
```

### Filter Menu (Command Palette Style)

Set `useFilterMenu={true}` to switch from filter list to command palette interface:

```tsx
<ReusableDataTable
  data={data}
  columns={columns}
  useFilterMenu={true}
/>
```

### Server-side Pagination

For server-side pagination, provide the total page count:

```tsx
<ReusableDataTable
  data={data}
  columns={columns}
  pageCount={totalPages}
/>
```

### Custom Row ID

Provide a function to extract unique row identifiers:

```tsx
<ReusableDataTable
  data={data}
  columns={columns}
  getRowId={(row) => row.id}
/>
```

## Example

See `components/data-table-example.tsx` for a complete working example with:
- Text filtering (title)
- Select filtering (status, category, priority)
- Range filtering (amount)
- Date filtering (createdAt)
- Row selection
- Bulk delete action
- Custom cell rendering with badges and icons

## Styling

The table uses Tailwind CSS and follows the shadcn/ui design system. All components are fully customizable through the component files in `components/data-table/` and `components/ui/`.

## Credits

Built with:
- [Dice UI](https://diceui.com) - Data table components
- [TanStack Table](https://tanstack.com/table) - Headless table library
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Nuqs](https://nuqs.47ng.com) - URL state management
