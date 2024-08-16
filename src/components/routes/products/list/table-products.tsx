'use client'

import { DataTable } from '@/shared/data-table'
import { useListProductsColumns } from './use-list-products-columns'
import { useTableProducts } from './use-table-categories'

export function TableProducts() {
  const { tableColumns } = useListProductsColumns()
  const { page, perPage, items, total, isLoading } = useTableProducts()

  return (
    <DataTable.Root
      columns={tableColumns}
      data={items}
      isLoading={isLoading}
      page={page}
      perPage={perPage}
      total={total}
    >
      <DataTable.Main isDraggable />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}
