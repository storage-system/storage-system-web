import { UpdateProductStockRequest } from '@/@types/product/stock'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useTableProducts } from '../list/use-table-products'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useProductsService } from '@/services/product'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { queryClient } from '@/utils/query-client'

export function useStockManagement() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')

  const companyId = session?.user?.companyId
  const username = session?.user?.name ?? 'Não encontrado'
  const { getStockMovementsService, updateStockService } = useProductsService()
  const { items: products, isLoading } = useTableProducts()

  const { data: movements, isLoading: stockMovementLoading } = useQuery({
    queryKey: [productsQueryKey.GET_STOCK_MOVEMENTS],
    queryFn: async () => getStockMovementsService(companyId!),
    enabled: !!companyId,
  })

  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return products
    const query = searchQuery.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.batch?.toLowerCase().includes(query) ||
        product.quantityInStock?.toString().includes(query),
    )
  }, [products, searchQuery])

  const { mutate: updateStock, isPending: isUpdatingStock } = useMutation({
    mutationFn: async ({
      productId,
      operation,
      quantity,
    }: UpdateProductStockRequest) => {
      return updateStockService(productId, {
        operation,
        quantity,
        performedBy: username,
      })
    },
    onSuccess: async (_, { operation, quantity }) => {
      await queryClient.invalidateQueries({
        queryKey: [productsQueryKey.LIST_PRODUCTS],
      })
      await queryClient.invalidateQueries({
        queryKey: [productsQueryKey.GET_STOCK_MOVEMENTS],
      })

      toast.success(
        operation === 'INCREASE'
          ? `Adicionou ${quantity} itens ao inventário`
          : `Removeu ${quantity} itens do inventário`,
      )
    },
    onError: (error) => {
      console.error('Failed to update stock:', error)
      toast.error('Erro ao atualizar o estoque. Por favor, tente novamente.')
    },
  })

  return {
    products,
    filteredProducts,
    movements,
    isLoading,
    searchQuery,
    setSearchQuery,
    updateStock,
    stockMovementLoading,
    isUpdatingStock,
  }
}
