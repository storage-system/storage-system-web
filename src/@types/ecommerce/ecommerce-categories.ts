import { components } from '../openapi'

export type CategoryDTO =
  components['schemas']['EcommerceCategoriesDTO'][number]

export type EcommerceProductDTO =
  components['schemas']['EcommerceProductsDTO']['items'][number]

export type PaginatedEcommerceProductDTO =
  components['schemas']['EcommerceProductsDTO']
