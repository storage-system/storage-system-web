import { storageSystemApi } from '../axios'
import { CreateConfigurationsInput } from '@/validations/create-configurations-schema'

export function useConfigurationsService() {
  async function createConfigurationsService(
    anInput: CreateConfigurationsInput,
  ) {
    await storageSystemApi.post('/api/configurations', anInput)
  }

  return {
    createConfigurationsService,
  }
}
