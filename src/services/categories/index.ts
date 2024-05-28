import { CreateCategoryInput } from "@/validations/create-category-schema";
import { storageSystemApi } from "../axios";

export function categoriesService() {
  async function createCategoryService(anInput: CreateCategoryInput) {
    await storageSystemApi.post('/categories', anInput)
  }

  return {
    createCategoryService
  }
}