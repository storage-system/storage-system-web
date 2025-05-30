import { ColumnDef } from '@tanstack/table-core'
import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { UpdateEcommerceProductsDTO } from '@/@types/ecommerce/ecommerce-management'
import { ListProduct } from '@/@types/product'
import { useEcommerceManagementService } from '@/services/ecommerce-management-service'
import { formattedDateFNS } from '@/utils/format-date'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteProductCell } from './cell/delete-product-cell'
import { EcommerceSwitchCell } from './cell/ecommerce-switch-cell'
import { ProductDetailCell } from './cell/product-detail-cell'
import { ProductStatusCell } from './cell/product-status-cell'
import { toast } from '@/components/ui/use-toast'
import { productsQueryKey } from '@/constants/query-key/products-query-key'

import { Loader2 } from 'lucide-react'

export function useListProductsColumns() {
  const [immediateProducts, setImmediateProducts] = useState<
    UpdateEcommerceProductsDTO[]
  >([])

  const [debouncedProducts] = useDebounceValue(immediateProducts, 2000)
  const { updateEcommerce } = useEcommerceManagementService()
  const queryClient = useQueryClient()

  const updateProductsMutation = useMutation({
    mutationKey: ['update-ecommerce-products'],
    mutationFn: async (input: UpdateEcommerceProductsDTO[]) => {
      await updateEcommerce(input)
    },
    onSuccess: () => {
      toast({
        title: 'Produtos atualizados com sucesso',
        description: 'Os produtos foram atualizados no ecommerce.',
        variant: 'success',
      })

      setImmediateProducts([])

      queryClient.invalidateQueries({
        queryKey: [productsQueryKey.LIST_PRODUCTS],
      })
    },
    onError: () => {
      toast({
        title: 'Erro ao atualizar produtos',
        description: 'Houve um erro ao atualizar os produtos no ecommerce.',
        variant: 'destructive',
      })
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
        <div className="text-center font-medium">
          Disponível no <br /> ecommerce?
        </div>
      ),
      cell: ({ row }) => {
        return !updateProductsMutation.isPending ? (
          <EcommerceSwitchCell
            productId={row.original.id}
            ecommerceId={row.original.ecommerceId}
            updateList={immediateProducts}
            setUpdateList={setImmediateProducts}
          />
        ) : (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
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
