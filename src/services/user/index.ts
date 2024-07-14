import { storageSystemApi } from "../axios";
import { CreateUserInput } from "@/validations/create-user-schema";

export function usersService() {
  const endpoint = '/users'

  async function createUsersService(anInput: CreateUserInput) {
    await storageSystemApi.post(endpoint, anInput)
  }

  return {
    createUsersService
  }
}