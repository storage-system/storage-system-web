import { PublishEcommerceType } from '@/validations/publish-ecommerce-schema'
import { storageSystemApi } from '../axios'

export function useEcommerceManagementService() {
  async function publishEcommerceService(
    anInput: PublishEcommerceType,
  ): Promise<void> {
    await storageSystemApi.post('/api/ecommerce/publish', anInput)
  }

  return {
    publishEcommerceService,
  }
}
