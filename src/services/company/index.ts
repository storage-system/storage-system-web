import { storageSystemApi } from '../axios'
import { CreateCompanyInput } from '@/validations/create-company-schema'

export function useCompaniesService() {
  const route = '/companies'

  async function createCompanyService(anInput: CreateCompanyInput) {
    await storageSystemApi.post(route, anInput)
  }

  return {
    createCompanyService,
  }
}
