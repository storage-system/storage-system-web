import { storageSystemApi } from "../axios";
import { AxiosRequestConfig } from "axios";
import { OldStockMetrics } from "@/@types/metrics";

export function useMetricsService() {
  async function getOldStockMetricsService(
    params?: AxiosRequestConfig
  ): Promise<OldStockMetrics> {
    const { data } = await storageSystemApi.get(`/api/metrics/old-stock`, {
      params,
    });
    return data;
  }

  return {
    getOldStockMetricsService,
  };
}
