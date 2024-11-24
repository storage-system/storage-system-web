import { CreateProductInput } from '@/validations/create-product-schema'
import { storageSystemApi } from '../axios'
import { Pagination } from '@/@types/pagination'
import { AxiosRequestConfig } from 'axios'
import { ListProduct, Product } from '@/@types/product'
import { UpdateProductOutput } from '@/validations/update-product-schema'

export function useProductsService() {
  async function createProductService(anInput: CreateProductInput) {
    await storageSystemApi.post('/api/products', anInput)
  }

  async function listProductsService(
    companyId: string,
    params?: AxiosRequestConfig,
  ): Promise<Pagination<ListProduct>> {
    const { data } = await storageSystemApi.get(
      `/api/products/company/{companyId}`,
      { routeParams: { companyId }, params },
    )
    return data
  }

  async function getProductByIdService(anId: string): Promise<Product> {
    const { data } = await storageSystemApi.get('/api/products/{id}', {
      routeParams: { id: anId },
    })

    return data
  }

  async function updateProductService(anInput: UpdateProductOutput) {
    return await storageSystemApi.patch('/api/products/{id}', anInput)
  }

  async function deleteProductService(anId: string) {
    storageSystemApi.delete(`/api/products/{id}`, { routeParams: { id: anId } })
  }

  return {
    createProductService,
    listProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
  }
}
