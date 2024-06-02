import { CreateCategoryInput } from "@/validations/create-category-schema";
import { storageSystemApi } from "../axios";
import { AxiosRequestConfig } from "axios";
import { Category } from "@/@types/category";
import { Pagination } from "@/@types/pagination";

export function useCategoriesService() {
  async function createCategoryService(anInput: CreateCategoryInput) {
    await storageSystemApi.post('/categories', anInput)
  }

  async function listCategoriesService(params?: AxiosRequestConfig): Promise<Pagination<Category>> {
    const { data } = await storageSystemApi.get('/categories', params)
    return data
  }

  return {
    createCategoryService,
    listCategoriesService,
  }
}