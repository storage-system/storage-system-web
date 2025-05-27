import {
  CategoryDTO,
  PaginatedEcommerceProductDTO,
} from '@/@types/ecommerce/ecommerce-categories'
import { storageSystemApi } from '@/services/axios'

export function useProductsService() {
  async function listCategory(slug: string) {
    const { data } = await storageSystemApi.get<CategoryDTO[]>(
      '/api/ecommerce/{slug}/categories',
      {
        routeParams: {
          slug,
        },
      },
    )

    return data
  }

  async function listProductByCategory(slug: string, categoryId: string) {
    const { data } = await storageSystemApi.get<PaginatedEcommerceProductDTO>(
      '/api/ecommerce/{slug}/products',
      {
        routeParams: {
          slug,
        },
        params: {
          categoryId,
        },
      },
    )

    return data
  }

  async function listProducts(slug: string) {
    const { data } = await storageSystemApi.get<PaginatedEcommerceProductDTO>(
      '/api/ecommerce/{slug}/products',
      {
        routeParams: {
          slug,
        },
      },
    )

    return data
  }

  return { listCategory, listProductByCategory, listProducts }
}
