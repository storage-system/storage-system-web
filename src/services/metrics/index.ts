import { storageSystemApi } from '../axios'
import { AxiosRequestConfig } from 'axios'
import { Metrics } from '@/@types/metrics'

export function useMetricsService() {
  async function getMetricsService(
    companyId: string,
    params?: AxiosRequestConfig,
  ): Promise<Metrics> {
    const { data } = await storageSystemApi.get(
      `/api/metrics/company/{companyId}`,
      { routeParams: { companyId }, params },
    )
    return data
  }

  return {
    getMetricsService,
  }
}
