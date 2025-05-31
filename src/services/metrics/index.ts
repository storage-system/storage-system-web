import { storageSystemApi } from '../axios'
import { AxiosRequestConfig } from 'axios'
import { OldStockMetrics, StockGeneralMetrics } from '@/@types/metrics'

export function useMetricsService() {
  async function getOldStockMetricsService(
    params?: AxiosRequestConfig,
  ): Promise<OldStockMetrics> {
    const { data } = await storageSystemApi.get('/api/metrics/old-stock', {
      params,
    })
    return data
  }

  async function getGeneralMetricsService(
    params?: AxiosRequestConfig,
  ): Promise<StockGeneralMetrics> {
    const { data } = await storageSystemApi.get('/api/metrics/stock-general', {
      params,
    })
    return data
  }

  return {
    getOldStockMetricsService,
    getGeneralMetricsService,
  }
}
