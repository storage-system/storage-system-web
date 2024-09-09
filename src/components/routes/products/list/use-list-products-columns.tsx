import { ListProduct } from '@/@types/product'
import { formattedDateFNS } from '@/utils/format-date'
import { ColumnDef } from '@tanstack/table-core'
import { parseISO } from 'date-fns'
import { DeleteProductCell } from './cell/delete-product-cell'
import { ProductStatusCell } from './cell/product-status-cell'
import { ProductDetailCell } from './cell/product-detail-cell'

export function useListProductsColumns() {
  const tableColumns: ColumnDef<ListProduct>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      enableHiding: false,
    },
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
      cell: ({ row }) => <ProductStatusCell status={row.original.status} />,
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex justify-evenly gap-4">
          <DeleteProductCell row={row.original} />
          <ProductDetailCell row={row.original} />
        </div>
      ),
      enableHiding: false,
    },
  ]

  return {
    tableColumns,
  }
}
