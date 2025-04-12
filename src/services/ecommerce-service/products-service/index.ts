import { EachProduct } from '@/@types/ecommerce/product'
import { Pagination } from '@/@types/pagination'
import { jsonServerApi, storageSystemApi } from '@/services/axios'

export function useProductsService() {
  async function listProducts() {
    const { data } =
      // TODO: FIX
      await jsonServerApi.get<Pagination<EachProduct>>('/products' as never)

    return data
  }

  return { listProducts }
}
