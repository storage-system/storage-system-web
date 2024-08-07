import { ListUsers } from '@/@types/users'
import { storageSystemApi } from '../axios'
import { CreateUserInput } from '@/validations/create-user-schema'
import { Pagination } from '@/@types/pagination'

export function useUsersService() {
  const endpoint = '/users'

  async function createUsersService(anInput: CreateUserInput) {
    await storageSystemApi.post(endpoint, anInput)
  }

  async function fetchUsersService(): Promise<Pagination<ListUsers>> {
    const { data } = await storageSystemApi.get(endpoint)

    return data
  }

  return {
    createUsersService,
    fetchUsersService,
  }
}
