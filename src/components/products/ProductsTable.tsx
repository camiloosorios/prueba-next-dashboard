'use client'
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
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import { useAppStore } from '@/store/store'
import { Product } from '@/types'
import { useEffect, useState } from 'react'
import CreateProductsModal from './CreateProductsModal'
import { EditProductModal } from './EditProductModal'
import ShowProductModal from './ShowProductModal'


export default function ProductsTable() {

    const products = useAppStore(state => state.products);
    const loadInitialData = useAppStore(state => state.loadInitialData);
    const setProducts = useAppStore(state => state.setProducts);

    const handleDelete = (id: number) => {
        const newProducts = products.filter(p => p.id !== id)
        setProducts(newProducts);
    };

    useEffect(() => {
        if (!products.length) {
            loadInitialData();
        }
    }, []);

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});

    const columns: ColumnDef<Product>[] = [
        {
            id: 'select',
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }) => (
                <div className='capitalize'>{row.getValue('title')}</div>
            ),
        },
        {
            accessorKey: 'price',
            header: () => <div className='text-right'>Price</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue('price'))

                const formatted = formatPrice(price);

                return <div className='text-right font-medium'>{formatted}</div>
            },
        },
        {
            accessorKey: 'description',
            header: ({ column }) => {
                return (
                    <Button
                        variant='ghost'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Description
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const description = row.getValue('description') as string;
                const maxLength = 70;
                const truncatedDescription = description.length > maxLength
                    ? `${description.slice(0, maxLength)}...`
                    : description;

                return <div className='lowercase'>{truncatedDescription}</div>;
            },
        },
        {
            accessorKey: 'category',
            header: ({ column }) => {
                return (
                    <Button
                        variant='ghost'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Category
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const category = row.getValue('category') as string;
                const formattedCategory = category
                    .split(' ')
                    .join('<br />');

                return (
                    <div
                        className='capitalize text-center'
                        dangerouslySetInnerHTML={{ __html: formattedCategory }}
                    />
                );
            },
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => (
                <img className='capitalize'
                    src={row.getValue('image')}
                    alt='Product image'
                    width={50}
                    height={50}
                />
            ),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const product = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <ShowProductModal
                                product={product}
                            />
                            <DropdownMenuSeparator />
                            <EditProductModal
                                product={product}
                            />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(product.id!)}>Delete product</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable<Product>({
        data: products,
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
                <Input
                    placeholder='Filter by title...'
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('title')?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <div className='flex justify-end w-full px-5'>
                    <CreateProductsModal />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-auto'>
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
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
            <div className='flex items-center justify-between space-x-2 py-4'>
                <div>
                    <label htmlFor='pageSize' className='mr-2 text-sm'>
                        Rows per page:
                    </label>
                    <select
                        id='pageSize'
                        className='border rounded px-2 py-1 text-sm dark:bg-black'
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(parseInt(e.target.value))}
                    >
                        {[5, 10, 20].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center space-x-2'>
                    <div className='flex-1 text-sm text-muted-foreground'>
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}.
                    </div>
                    <div className='space-x-2'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}
