import { CreateProductInput } from '@/validations/create-category-schema'
import { storageSystemApi } from '../axios'

export function useProductsService() {
  const route = '/products'

  async function createProductService(anInput: CreateProductInput) {
    await storageSystemApi.post(route, anInput)
  }

  return {
    createProductService,
  }
}
