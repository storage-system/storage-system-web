import { metricsQueryKey } from '@/constants/query-key/metrics-query-key'
import { useMetricsService } from '@/services/metrics'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useGeneralStockMetrics() {
  const { getGeneralMetricsService } = useMetricsService()
  const { data: session } = useSession()
  const companyId = session?.user.companyId

  const { data: generalStockMetrics, isLoading: generalStockMetricsLoading } =
    useQuery({
      queryKey: [metricsQueryKey.GET_GENERAL_STOCK_METRICS, companyId],
      queryFn: async () => await getGeneralMetricsService(),
      enabled: !!companyId,
    })

  return {
    generalStockMetrics,
    generalStockMetricsLoading,
  }
}
