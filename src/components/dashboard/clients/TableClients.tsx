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

type TableClientsProps = {
  name: string;
  company: string;
  email: string;
  country: string;
  volume: number;
  icon: string;  // Imagen del cliente
}

const data: TableClientsProps[] = [
  {
    name: 'John Doe',
    company: 'Acme Inc.',
    email: 'john.doe@acme.com',
    country: 'USA',
    volume: 150000,
    icon: '/images/acme-logo.svg',
  },
  {
    name: 'Jane Smith',
    company: 'Global Tech',
    email: 'jane.smith@globaltech.com',
    country: 'UK',
    volume: 120000,
    icon: '/images/global-logo.svg',
  },
  {
    name: 'Carlos García',
    company: 'Desarrollo S.A.',
    email: 'carlos.garcia@desarrollo.com',
    country: 'Mexico',
    volume: 100000,
    icon: '/images/desarrollo-logo.svg',
  },
  {
    name: 'Linda Parker',
    company: 'Green Solutions',
    email: 'linda.parker@greensolutions.com',
    country: 'Canada',
    volume: 80000,
    icon: '/images/green-logo.svg',
  },
];

export const columns: ColumnDef<TableClientsProps>[] = [
  {
    accessorKey: 'icon',
    header: () => <div className='font-bold'>Logo</div>,
    cell: ({ row }) => (
      <div className='capitalize'>
        <Image
          src={row.getValue('icon')}
          alt='Client Logo'
          width={30}
          height={30}
        />
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: () => <div className='font-bold'>Client</div>,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'company',
    header: () => <div className='font-bold'>Company</div>,
    cell: ({ row }) => <div className='capitalize'>{row.getValue('company')}</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className='font-bold'>Email</div>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'country',
    header: () => <div className='font-bold'>Country</div>,
    cell: ({ row }) => <div>{row.getValue('country')}</div>,
  },
  {
    accessorKey: 'volume',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='float-end px-0 font-bold'
      >
        Volume
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('volume'));
      return (
        <div className='font-medium text-end'>{formatPrice(amount)}</div>
      );
    },
  },
];

export default function TableClients() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
  });

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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
