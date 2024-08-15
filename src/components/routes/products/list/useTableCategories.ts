import { Pagination } from '@/@types/pagination'
import { ListProduct } from '@/@types/product'
import { useProductsService } from '@/services/product'
import { generateProducts } from '@/utils/mock/generate-products'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useTableProducts() {
  const searchParams = useSearchParams()
  const { listProductsService } = useProductsService()

  const page = searchParams.get('page')
    ? Math.max(parseInt(searchParams.get('page')!), 1)
    : 1

  const perPage = searchParams.get('perPage')
    ? Math.max(parseInt(searchParams.get('perPage')!), 10)
    : 10

  async function handleGetProducts() {
    const data = await listProductsService({
      params: {
        page,
        perPage,
      },
    })

    return data
  }

  // const { data, isLoading } = useQuery({
  //   queryKey: [productsQueryKey.LIST_PRODUCTS, page, perPage],
  //   queryFn: handleGetProducts,
  // })

  const data: Pagination<ListProduct> = {
    currentPage: 1,
    items: generateProducts(10),
    perPage: 10,
    total: 10,
  }

  const items = data?.items ?? []
  const total = data?.total ?? 0

  return {
    items,
    total,
    page,
    perPage,
    // isLoading,
  }
}
