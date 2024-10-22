import { storageSystemApi } from '../axios'
import {
  CreateCompanyAddressInput,
  CreateCompanyInput,
} from '@/validations/create-company-schema'

export function useCompaniesService() {
  async function createCompanyService(
    anInput: CreateCompanyInput & { address: CreateCompanyAddressInput },
  ) {
    await storageSystemApi.post('/api/companies', anInput)
  }

  return {
    createCompanyService,
  }
}
