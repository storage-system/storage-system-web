import { CreateCategoryInput } from '@/validations/create-category-schema'
import { storageSystemApi } from '../axios'
import { AxiosRequestConfig } from 'axios'
import { ListCategory } from '@/@types/category'
import { Pagination } from '@/@types/pagination'

export function useCategoriesService() {
  async function createCategoryService(anInput: CreateCategoryInput) {
    await storageSystemApi.post('/categories', anInput)
  }

  async function listCategoriesService(
    params?: AxiosRequestConfig,
  ): Promise<Pagination<ListCategory>> {
    const { data } = await storageSystemApi.get('/categories', params)
    return data
  }

  async function updateCategoryService(
    anId: string,
    anInput: Partial<CreateCategoryInput>,
  ) {
    await storageSystemApi.patch(`/categories/${anId}`, anInput)
  }

  async function deleteCategoryService(anId: string) {
    await storageSystemApi.delete(`/categories/${anId}`)
  }

  return {
    createCategoryService,
    listCategoriesService,
    updateCategoryService,
    deleteCategoryService,
  }
}
