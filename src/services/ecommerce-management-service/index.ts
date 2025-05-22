import { PublishEcommerceType } from '@/validations/publish-ecommerce-schema'
import { storageSystemApi } from '../axios'
import { RetrieveEcommerceDTO } from '@/@types/ecommerce/ecommerce-management'

export function useEcommerceManagementService() {
  async function publishEcommerceService(
    anInput: PublishEcommerceType,
  ): Promise<void> {
    await storageSystemApi.post('/api/ecommerce/publish', anInput)
  }

  async function getEcommerce() {
    const { data } =
      await storageSystemApi.get<RetrieveEcommerceDTO>('/api/ecommerce')

    return data
  }

  return {
    publishEcommerceService,
    getEcommerce,
  }
}
