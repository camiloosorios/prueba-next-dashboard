'use client'
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type TableIntegrationsProps = {
  app: string,
  icon: string,
  type: 'Finance' | 'CRM' | 'Marketplace',
  rate: number,
  profit: number
}

const data: TableIntegrationsProps[] = [
  {
    app: 'Stripe',
    icon: '/images/stripe.webp',
    type: 'Finance',
    rate: 60,
    profit: 450
  },
  {
    app: 'Zpier',
    icon: '/images/zapier.svg',
    type: 'CRM',
    rate: 20,
    profit: 123.5
  },
  {
    app: 'Shopify',
    icon: '/images/shopify.svg',
    type: 'Marketplace',
    rate: 80,
    profit: 879.89
  },
];

export const columns: ColumnDef<TableIntegrationsProps>[] = [
  {
    accessorKey: 'icon',
    header: () => <div className='font-bold'>Logo</div>,
    cell: ({ row }) => (
      <div className='capitalize'>
        <Image
          src={row.getValue('icon')}
          alt='Logo'
          width={20}
          height={20}
        />
      </div>
    ),
  },
  {
    accessorKey: 'app',
    header: () => <div className='font-bold'>Application</div>,
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('app')}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: () => <div className='font-bold'>Type</div>,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'rate',
    header: () => <div className='font-bold'>Rate</div>,
    cell: ({ row }) => (
      <div className='font-medium flex gap-1 items-center'>
        <Progress
          value={row.getValue('rate')}
          className='h-2'
        />
      </div>
    ),
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='float-end px-0 font-bold'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Profit
        <ChevronUp className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('profit'));
      return (
        <div className='font-medium text-end'>{formatPrice(amount)}</div>
      )
    },
  },
]

export default function TableIntegrations() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <DropdownMenu>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


