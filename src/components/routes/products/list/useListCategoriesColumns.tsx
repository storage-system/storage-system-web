import { ListCategory } from '@/@types/category'
import { ColumnDef } from '@tanstack/table-core'

export function useListProductsColumns() {
  const tableColumns: ColumnDef<ListCategory>[] = [
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
      accessorKey: 'originalPrice',
      header: 'Preço Original',
    },
    {
      accessorKey: 'finalPrice',
      header: 'Preço Final',
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Porcentagem de Desconto',
    },
    {
      accessorKey: 'quantityInStock',
      header: 'Quantidade em Estoque',
    },
    {
      accessorKey: 'manufactureDate',
      header: 'Data de Fabricação',
    },
    {
      accessorKey: 'validityInDays',
      header: 'Validade (dias)',
    },
    {
      accessorKey: 'unitOfMeasure',
      header: 'Unidade de Medida',
    },
    {
      accessorKey: 'weight',
      header: 'Peso',
    },
    {
      accessorKey: 'dimensions_height',
      header: 'Altura',
    },
    {
      accessorKey: 'dimensions_width',
      header: 'Largura',
    },
    {
      accessorKey: 'dimensions_depth',
      header: 'Profundidade',
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
