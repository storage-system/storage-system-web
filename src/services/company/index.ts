import { storageSystemApi } from '../axios'
import { CreateAccountInput } from '@/validations/create-account-schema'

export function companiesService() {
  async function createCompanyService(anInput: CreateAccountInput) {
    await storageSystemApi.post('/accounts', anInput)
  }

  return {
    createCompanyService,
  }
}
