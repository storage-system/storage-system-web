import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { useProductsService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function useTableProducts() {
  const searchParams = useSearchParams()
  const { listProductsService } = useProductsService()
  const { data: session } = useSession()
  const companyId = session?.user.companyId

  const page = searchParams.get('page')
    ? Math.max(parseInt(searchParams.get('page')!), 1)
    : 1

  const perPage = searchParams.get('perPage')
    ? Math.max(parseInt(searchParams.get('perPage')!), 10)
    : 10

  async function handleGetProducts(companyId: string) {
    const data = await listProductsService(
      { companyId },
      {
        params: {
          page,
          perPage,
        },
      },
    )

    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: [productsQueryKey.LIST_PRODUCTS, page, perPage, companyId],
    queryFn: async () => {
      if (companyId) {
        return handleGetProducts(companyId)
      }
      return null
    },
  })

  const items = data?.items ?? []
  const total = data?.total ?? 0

  return {
    items,
    total,
    page,
    perPage,
    isLoading,
  }
}
