import { metricsQueryKey } from '@/constants/query-key/metrics-query-key'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { useMetricsService } from '@/services/metrics'
import { useProductsService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useOldStockMetrics() {
  const { getOldStockMetricsService } = useMetricsService()
  const { getStockMovementsService } = useProductsService()
  const { data: session } = useSession()
  const companyId = session?.user.companyId

  const { data: oldStockMetrics, isLoading: odStockMetricsLoading } = useQuery({
    queryKey: [metricsQueryKey.GET_OLD_STOCK_METRICS, companyId],
    queryFn: async () => await getOldStockMetricsService(),
    enabled: !!companyId,
  })

  const { data: movements, isLoading: stockMovementLoading } = useQuery({
    queryKey: [productsQueryKey.GET_STOCK_MOVEMENTS],
    queryFn: async () => getStockMovementsService(companyId!),
    enabled: !!companyId,
  })

  return {
    oldStockMetrics,
    odStockMetricsLoading,
    movements,
    stockMovementLoading,
  }
}
