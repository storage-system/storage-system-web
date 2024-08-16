import { ListProduct } from '@/@types/product'
import { formattedDateFNS } from '@/utils/format-date'
import { ColumnDef } from '@tanstack/table-core'
import { parseISO } from 'date-fns'

export function useListProductsColumns() {
  const tableColumns: ColumnDef<ListProduct>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      enableHiding: false,
    },
    // {
    //   accessorKey: 'description',
    //   header: 'Descrição',
    // },
    {
      accessorKey: 'quantityInStock',
      header: 'Quantidade em Estoque',
    },
    {
      accessorKey: 'manufactureDate',
      header: 'Data de Fabricação',
      cell: ({ row }) => {
        return formattedDateFNS(parseISO(row.original.manufactureDate))
      },
    },
    {
      accessorKey: 'validityInDays',
      header: 'Validade (dias)',
    },
    {
      accessorKey: 'manufacturer',
      header: 'Fabricante',
    },
    {
      accessorKey: 'batch',
      header: 'Lote',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ]

  return {
    tableColumns,
  }
}
