import { AuthenticateInput } from '@/validations/authenticate-schema'
import { storageSystemApi } from '../axios'

export function authService() {
  async function authenticateService(anInput: AuthenticateInput) {
    const { data } = await storageSystemApi.post('/api/sessions', anInput)

    return data
  }

  return {
    authenticateService,
  }
}
