'use client'

import { DataTable } from '@/shared/data-table'
import { useListProductsColumns } from './useListCategoriesColumns'
import { useTableProducts } from './useTableCategories'

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
