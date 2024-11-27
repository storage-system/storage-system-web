import { CreateStyleOutput } from '@/validations/create-style-schema'
import { storageSystemApi } from '../axios'
import { Pagination } from '@/@types/pagination'
import { AxiosRequestConfig } from 'axios'
import { ListStyle, ListEachStyle } from '@/@types/style'

export function useStylesService() {
  async function createStyleService(anInput: CreateStyleOutput) {
    await storageSystemApi.post('/api/styles', anInput)
  }

  async function listStylesService(
    params?: AxiosRequestConfig,
  ): Promise<Pagination<ListStyle>> {
    const { data } = await storageSystemApi.get('/api/styles', params)
    return data
  }

  async function getStyleByIdService(anId: string): Promise<ListEachStyle> {
    const { data } = await storageSystemApi.get('/api/styles/{id}', {
      routeParams: { id: anId },
    })

    return data
  }

  async function deleteStyleService(anId: string) {
    storageSystemApi.delete(`/api/styles/{id}`, { routeParams: { id: anId } })
  }

  return {
    createStyleService,
    listStylesService,
    getStyleByIdService,
    deleteStyleService,
  }
}
