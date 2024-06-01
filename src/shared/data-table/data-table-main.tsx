'use client'

import { Table, TableBody, TableHeader, TableRow, TableCell, TableHead } from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { flexRender } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'

import { useDataTableContext } from './data-table-provider'
import { Skeleton } from '@/components/ui/skeleton'

export function DataTableMain() {
  const { table, isLoading } = useDataTableContext()
  const translate = useTranslations('shared.table')
  const columns = table.getAllColumns()

  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="whitespace-nowrap text-center text-sm font-bold text-foreground"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                className="h-24 text-center"
                colSpan={columns.length}
              >
                <div className="gap-4">
                  {Array.from({ length: 3 }).map((_, index) => {
                    return (
                      <Skeleton
                        className="h-6 w-full"
                        key={index}
                      />
                    )
                  })}
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() ? 'selected' : null}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="text-center text-sm"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center"
                colSpan={columns.length}
              >
                {translate('no_data')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
