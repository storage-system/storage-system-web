import { CreateCategoryInput } from '@/validations/create-category-schema'
import { storageSystemApi } from '../axios'
import { AxiosRequestConfig } from 'axios'
import { ListCategory } from '@/@types/category'

export function useCategoriesService() {
  async function createCategoryService(anInput: CreateCategoryInput) {
    await storageSystemApi.post('/api/categories', anInput)
  }

  async function listCategoriesService(
    params?: AxiosRequestConfig,
  ): Promise<ListCategory> {
    const { data } = await storageSystemApi.get('/api/categories', params)
    return data
  }

  async function updateCategoryService(
    anId: string,
    anInput: Partial<CreateCategoryInput>,
  ) {
    await storageSystemApi.patch(`/api/categories/{id}`, anInput, {
      routeParams: { id: anId },
    })
  }

  async function deleteCategoryService(anId: string) {
    await storageSystemApi.delete('/api/categories/{id}', {
      routeParams: { id: anId },
    })
  }

  return {
    createCategoryService,
    listCategoriesService,
    updateCategoryService,
    deleteCategoryService,
  }
}
