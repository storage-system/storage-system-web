import { metricsQueryKey } from '@/constants/query-key/metrics-query-key'
import { useMetricsService } from '@/services/metrics'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export function useMetrics() {
  const { getMetricsService } = useMetricsService()
  const { data: session } = useSession()
  const companyId = session?.user.companyId

  const { data, isLoading } = useQuery({
    queryKey: [metricsQueryKey.GET_METRICS, companyId],
    queryFn: async () => await getMetricsService(companyId ?? ''),
    enabled: !!companyId,
  })

  return {
    data,
    isLoading,
  }
}
