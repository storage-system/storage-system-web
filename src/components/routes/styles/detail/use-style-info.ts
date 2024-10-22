import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { useProductsService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useProductInfo() {
  const { getProductByIdService } = useProductsService()
  const { id }: { id: string } = useParams()

  const { data: product } = useQuery({
    queryKey: [productsQueryKey.GET_PRODUCT_BY_ID],
    queryFn: () => getProductByIdService(id),
  })

  return { product }
}
