'use client'
import { useAppStore } from '@/store/store'
import { Product } from '@/types'
import { Table } from '@tanstack/react-table'

type PaginationProps = {
    table: Table<Product>
}

export default function Pagination({ table }: PaginationProps) {

    const theme = useAppStore(state => state.theme);

    return (
        <div className='flex gap-5 w-fit mx-auto lg:ml-auto lg:mr-5 mt-5'>
            <svg fill={theme === 'light' ? '#000000' : '#a6a5a2'} height='800px' width='800px' version='1.1' id='Filled_Icons' xmlns='http://www.w3.org/2000/svg' x='0px'
                y='0px' viewBox='0 0 24 24' enableBackground='new 0 0 24 24' className='w-5 h-5 cursor-pointer' onClick={() => table.setPageIndex(0)}>
                <g id='Chevron-Left-Double'>
                    <path d='M21,1l3,3l-8,8l8,8l-3,3L10,12L21,1z M11,1l3,3l-8,8l8,8l-3,3L0,12L11,1z' />
                </g>
            </svg>
            <svg fill={theme === 'light' ? '#000000' : '#a6a5a2'} width='800px' height='800px' viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg' onClick={() => table.getCanPreviousPage() ? table.previousPage() : null} className='w-5 h-5 cursor-pointer'>
                <title>chevron-left</title>
                <polygon points='15.3 23.9 3.4 12 15.3 0.1 18.2 2.9 9.1 12 18.2 21.1 15.3 23.9' />
            </svg>
            <span className='text-sm text-black dark:text-gray-300 font-bold'>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <svg fill={theme === 'light' ? '#000000' : '#a6a5a2'} width='800px' height='800px' viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg' onClick={() => table.getCanNextPage() ? table.nextPage() : null} className='w-5 h-5 cursor-pointer'>
                <title>chevron-right</title>
                <polygon points='7.7 23.9 4.8 21.1 13.9 12 4.8 2.9 7.7 0.1 19.6 12 7.7 23.9' />
            </svg>
            <svg fill={theme === 'light' ? '#000000' : '#a6a5a2'} height='800px' width='800px' version='1.1' id='Filled_Icons' xmlns='http://www.w3.org/2000/svg' x='0px'
                y='0px' viewBox='0 0 24 24' enableBackground='new 0 0 24 24' onClick={() => table.setPageIndex(table.getPageCount() - 1)} className='w-5 h-5 cursor-pointer'>
                <g id='Chevron-Right-Double'>
                    <path d='M3,23l-3-3l8-8L0,4l3-3l11,11L3,23z M13,23l-3-3l8-8l-8-8l3-3l11,11L13,23z' />
                </g>
            </svg>
        </div>
    )
}
