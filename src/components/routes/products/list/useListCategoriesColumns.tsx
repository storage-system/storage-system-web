import { ListCategory } from '@/@types/category'
import { ColumnDef } from '@tanstack/table-core'

export function useListProductsColumns() {
  const tableColumns: ColumnDef<ListCategory>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
      enableHiding: false,
      accessorFn: () => {},
    },
    // {
    //   accessorKey: 'description',
    //   header: 'Descrição',
    // },
    {
      accessorKey: 'originalPrice',
      header: 'Preço Original',
      accessorFn: () => {},
    },
    {
      accessorKey: 'finalPrice',
      header: 'Preço Final',
      accessorFn: () => {},
    },
    {
      accessorKey: 'discountPercentage',
      header: 'Porcentagem de Desconto',
      accessorFn: () => {},
    },
    {
      accessorKey: 'quantityInStock',
      header: 'Quantidade em Estoque',
      accessorFn: () => {},
    },
    {
      accessorKey: 'manufactureDate',
      header: 'Data de Fabricação',
      accessorFn: () => {},
    },
    {
      accessorKey: 'validityInDays',
      header: 'Validade (dias)',
      accessorFn: () => {},
    },
    {
      accessorKey: 'unitOfMeasure',
      header: 'Unidade de Medida',
      accessorFn: () => {},
    },
    {
      accessorKey: 'weight',
      header: 'Peso',
      accessorFn: () => {},
    },
    {
      accessorKey: 'dimensions_height',
      header: 'Altura',
      accessorFn: () => {},
    },
    {
      accessorKey: 'dimensions_width',
      header: 'Largura',
      accessorFn: () => {},
    },
    {
      accessorKey: 'dimensions_depth',
      header: 'Profundidade',
      accessorFn: () => {},
    },
    {
      accessorKey: 'manufacturer',
      header: 'Fabricante',
      accessorFn: () => {},
    },
    {
      accessorKey: 'batch',
      header: 'Lote',
      accessorFn: () => {},
    },
    {
      accessorKey: 'status',
      header: 'Status',
      accessorFn: () => {},
    },
  ]

  return {
    tableColumns,
  }
}
