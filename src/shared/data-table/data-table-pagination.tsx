'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { useDataTableContext } from './data-table-provider'

export function DataTablePagination() {
  const { table, total } = useDataTableContext()

  const lastPageIndex = table.getPageCount()

  const { pagination } = table.getState()

  const initialCount = pagination.pageSize * pagination.pageIndex
  const dataInPageSize = table.getRowModel().rows.length
  const isLess = dataInPageSize < pagination.pageSize
  const isLessValue = total
  const isntLessValue =
    pagination.pageSize * pagination.pageIndex === 0
      ? pagination.pageSize
      : pagination.pageSize * (pagination.pageIndex + 1)
  const betweenValue = isLess ? isLessValue : isntLessValue

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 px-2 md:flex-row">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por pagina</p>
        <Select
          onValueChange={(value: string) => table.setPageSize(Number(value))}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full items-center justify-between space-x-6 md:w-auto md:justify-start lg:space-x-8">
        <div className="flex w-[180px] items-center justify-end text-sm font-medium">
          {String(initialCount + 1)
            .concat(' - ')
            .concat(betweenValue.toString())
            .concat(' ')
            .concat('de')
            .concat(' ')
            .concat(total.toString())}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            size="icon"
            variant="ghost"
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="ghost"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="ghost"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(lastPageIndex)}
            size="icon"
            variant="outline"
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
