import { ListCategory } from "@/@types/category"
import { dateFormatter } from "@/utils/format-date"
import { ColumnDef } from "@tanstack/table-core"
import { CategoryActiveCell } from "./cell/active-category-cell"
import { DeleteCategoryCell } from "./cell/delete-category-cell"
import { UpdateCategoryCell } from "./cell/update-category-cell"

export function useListCategoriesColumns() {
  const tableColumns: ColumnDef<ListCategory>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      enableHiding: false,
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ row }) => dateFormatter.format(new Date(row.original.createdAt)),
      enableHiding: false,
    },
    {
      accessorKey: 'updatedAt',
      header: 'Atualizado em',
      cell: ({ row }) => dateFormatter.format(new Date(row.original.updatedAt)),
      enableHiding: false,
    },
    {
      accessorKey: 'isActive',
      header: 'Ativo',
      cell: ({ row }) => (
        <CategoryActiveCell row={row.original} />
      ),
      enableHiding: false,
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex justify-evenly">
          <UpdateCategoryCell row={row.original} />
          <DeleteCategoryCell row={row.original} />
        </div>
      ),
      enableHiding: false,
    },
  ]

  return {
    tableColumns
  }
}