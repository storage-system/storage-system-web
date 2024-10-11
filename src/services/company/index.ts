import { storageSystemApi } from '../axios'
import { CreateCompanyInput } from '@/validations/create-company-schema'

export function useCompaniesService() {
  async function createCompanyService(anInput: CreateCompanyInput) {
    await storageSystemApi.post('/api/companies', anInput)
  }

  return {
    createCompanyService,
  }
}
