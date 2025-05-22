import { EachProduct } from '@/@types/ecommerce/product'
import { Pagination } from '@/@types/pagination'
import { jsonServerApi } from '@/services/axios'

export function useProductsService() {
  async function listProducts() {
    const { data } =
      // TODO: FIX
      await jsonServerApi.get<Pagination<EachProduct>>('/products' as never)

    return data
  }

  async function getProduct(id: string) {
    // TODO: FIX
    const { data } = await jsonServerApi.get(('/product/' + id) as never)

    return data
  }

  return { listProducts, getProduct }
}
