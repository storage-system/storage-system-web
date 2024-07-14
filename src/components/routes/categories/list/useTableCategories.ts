import { categoriesQueryKey } from '@/constants/query-key/categories-query-key'
import { useCategoriesService } from '@/services/categories'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export function useTableCategories() {
  const searchParams = useSearchParams()
  const { listCategoriesService } = useCategoriesService()

  const page = searchParams.get('page')
    ? Math.max(parseInt(searchParams.get('page')!), 1)
    : 1

  const perPage = searchParams.get('perPage')
    ? Math.max(parseInt(searchParams.get('perPage')!), 10)
    : 10

  async function handleGetCategories() {
    const data = await listCategoriesService({
      params: {
        page,
        perPage,
      },
    })

    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: [categoriesQueryKey.LIST_CATEGORIES, page, perPage],
    queryFn: handleGetCategories,
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
