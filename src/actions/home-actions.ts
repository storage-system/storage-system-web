'use server'

import {
  CategoryDTO,
  EcommerceProductDTO,
  PaginatedEcommerceProductDTO,
} from '@/@types/ecommerce/ecommerce-categories'
import { storageSystemApi } from '@/services/axios'

export async function listEcommerceCategories(
  slug: string,
): Promise<CategoryDTO[]> {
  const { data } = await storageSystemApi.get<CategoryDTO[]>(
    '/api/ecommerce/{slug}/categories',
    {
      routeParams: { slug },
    },
  )

  return data
}

export async function listEcommerceProductsByCategory(
  slug: string,
  categoryId: string,
): Promise<PaginatedEcommerceProductDTO> {
  const { data } = await storageSystemApi.get<PaginatedEcommerceProductDTO>(
    '/api/ecommerce/{slug}/products',
    {
      routeParams: { slug },
      params: { categoryId },
    },
  )

  return data
}

export async function listAllEcommerceProducts(
  slug: string,
): Promise<PaginatedEcommerceProductDTO> {
  const { data } = await storageSystemApi.get<PaginatedEcommerceProductDTO>(
    '/api/ecommerce/{slug}/products',
    {
      routeParams: { slug },
    },
  )

  return data
}

export type CategoryWithProducts = {
  category: CategoryDTO
  products: EcommerceProductDTO[]
}

export async function listEcommerceProductsGroupedByCategory(
  slug: string,
): Promise<CategoryWithProducts[]> {
  const { data: categories } = await storageSystemApi.get<CategoryDTO[]>(
    '/api/ecommerce/{slug}/categories',
    {
      routeParams: { slug },
    },
  )

  const results: CategoryWithProducts[] = []

  for (const category of categories) {
    const { data: productResponse } = await storageSystemApi.get<{
      items: EcommerceProductDTO[]
    }>('/api/ecommerce/{slug}/products', {
      routeParams: { slug },
      params: {
        categoryId: category.id,
      },
    })

    const products = productResponse.items ?? []

    if (products.length > 0) {
      results.push({
        category,
        products,
      })
    }
  }

  return results
}
