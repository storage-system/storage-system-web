import { Category } from "@/@types/category"
import { dateFormatter } from "@/utils/format-date"
import { Switch } from '@/components/ui/switch'
import { ColumnDef } from "@tanstack/table-core"

export function useListCategoriesColumns() {
  const tableColumns: ColumnDef<Category>[] = [
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
        <Switch
          defaultChecked={row.original.isActive}
        /* onCheckedChange={field.onChange} */
        />
      ),
      enableHiding: false,
    },
  ]

  return {
    tableColumns
  }
}