import {
  PublishEcommerce,
  RetrieveEcommerceByCompany,
} from '@/@types/ecommerce/ecommerce'
import { storageSystemApi } from '../axios'

export function useEcommerceManagementService() {
  async function publishEcommerce(input: PublishEcommerce) {
    const { data } = await storageSystemApi.post('/api/ecommerce', input)

    return data
  }

  async function retrieveCompanyEcommerce() {
    const { data } =
      await storageSystemApi.get<RetrieveEcommerceByCompany>('/api/ecommerce')

    return data
  }

  return { publishEcommerce, retrieveCompanyEcommerce }
}
