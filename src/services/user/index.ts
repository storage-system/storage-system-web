import { ListUsers } from '@/@types/users'
import { storageSystemApi } from '../axios'
import { CreateUserInput } from '@/validations/create-user-schema'
import { Pagination } from '@/@types/pagination'

export function useUsersService() {
  async function createUsersService(anInput: CreateUserInput) {
    const { data } = await storageSystemApi.post<{ userId: string }>(
      '/api/users',
      anInput,
    )

    return { data }
  }

  async function fetchUsersService(): Promise<Pagination<ListUsers>> {
    const { data } = await storageSystemApi.get('/api/users')

    return data
  }

  return {
    createUsersService,
    fetchUsersService,
  }
}
