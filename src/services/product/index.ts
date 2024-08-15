import { CreateProductInput } from '@/validations/create-category-schema'
import { storageSystemApi } from '../axios'
import { Pagination } from '@/@types/pagination'
import { AxiosRequestConfig } from 'axios'
import { ListProduct } from '@/@types/product'

export function useProductsService() {
  const route = '/products'

  async function createProductService(anInput: CreateProductInput) {
    await storageSystemApi.post(route, anInput)
  }

  async function listProductsService(
    params?: AxiosRequestConfig,
  ): Promise<Pagination<ListProduct>> {
    const { data } = await storageSystemApi.get(route, params)
    return data
  }

  return {
    createProductService,
    listProductsService,
  }
}
