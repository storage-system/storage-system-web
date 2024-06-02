"use client"

import { DataTable } from "@/shared/data-table";
import { useTableCategories } from "./useTableCategories";
import { useListCategoriesColumns } from "./useListCategoriesColumns";

export function TableCategories() {
  const { tableColumns } = useListCategoriesColumns()
  const { page, perPage, items, total, isLoading } = useTableCategories()

  return (
    <DataTable.Root
      columns={tableColumns}
      data={items}
      isLoading={isLoading}
      page={page}
      perPage={perPage}
      total={total}
    >
      <DataTable.Main />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}