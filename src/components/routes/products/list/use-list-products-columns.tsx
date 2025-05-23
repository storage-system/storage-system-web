import { ColumnDef } from '@tanstack/table-core'
import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { UpdateEcommerceProductsDTO } from '@/@types/ecommerce/ecommerce-management'
import { ListProduct } from '@/@types/product'
import { useEcommerceManagementService } from '@/services/ecommerce-management-service'
import { formattedDateFNS } from '@/utils/format-date'
import { useMutation } from '@tanstack/react-query'
import { DeleteProductCell } from './cell/delete-product-cell'
import { EcommerceSwitchCell } from './cell/ecommerce-switch-cell'
import { ProductDetailCell } from './cell/product-detail-cell'
import { ProductStatusCell } from './cell/product-status-cell'

export function useListProductsColumns() {
  const [immediateProducts, setImmediateProducts] = useState<
    UpdateEcommerceProductsDTO[]
  >([])
  const [debouncedProducts] = useDebounceValue(immediateProducts, 1000)
  const { updateEcommerce } = useEcommerceManagementService()

  const updateProductsMutation = useMutation({
    mutationKey: ['update-ecommerce-products'],
    mutationFn: async (input: UpdateEcommerceProductsDTO[]) => {
      await updateEcommerce(input)
    },
  })

  useEffect(() => {
    if (debouncedProducts.length > 0) {
      updateProductsMutation.mutate(debouncedProducts)
    }
  }, [debouncedProducts])

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
      cell: ({ row }) =>
        formattedDateFNS(parseISO(row.original.manufactureDate)),
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
      accessorKey: 'ecommerce',
      header: () => (
        <div className="w-[100px] text-wrap">Disponível no ecommerce?</div>
      ),
      cell: ({ row }) => {
        console.log(row.original.ecommerceId)

        return (
          <EcommerceSwitchCell
            productId={row.original.id}
            ecommerceId={row.original.ecommerceId}
            updateList={immediateProducts}
            setUpdateList={setImmediateProducts}
          />
        )
      },
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex justify-evenly gap-4">
          <ProductDetailCell row={row.original} />
          <DeleteProductCell row={row.original} />
        </div>
      ),
      enableHiding: false,
    },
  ]

  return {
    tableColumns,
  }
}
