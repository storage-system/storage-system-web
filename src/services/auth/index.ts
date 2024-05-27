import { AuthenticateInput } from "@/validations/authenticate-schema";
import { storageSystemApi } from "../axios";

export function authService() {
  async function authenticateService(anInput: AuthenticateInput) {
    const { data } = await storageSystemApi.post('/sessions', anInput)
    console.log(data)
    return data
  }

  return {
    authenticateService
  }
}