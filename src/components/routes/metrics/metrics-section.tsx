import { SectionsType } from '@/@types/metrics'
import {
  AlertTriangleIcon,
  BoxesIcon,
  CalendarIcon,
  CircleDollarSign,
  ClockIcon,
  DollarSignIcon,
  HourglassIcon,
  PackageIcon,
  PieChartIcon,
} from 'lucide-react'
import { useMetrics } from './use-metrics'
import { formatMetricValue } from '@/utils/format-currency'

export function useMetricsSection() {
  const { data } = useMetrics()

  const oldStockMetrics = data?.oldStockMetrics
  const productMetrics = data?.productMetrics

  const totalProductsOldStock = formatMetricValue(
    oldStockMetrics?.totalOldStockValue,
  )
  const totalProducts = formatMetricValue(productMetrics?.totalStockValue)

  const sections: SectionsType[] = [
    {
      title: 'Métricas de Produtos',
      items: [
        {
          label: 'Total de produtos',
          value: productMetrics?.totalStockQuantity ?? 0,
          icon: <BoxesIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Valor total de produtos',
          value: totalProducts,
          icon: <CircleDollarSign className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Produtos em "warning days"',
          value: productMetrics?.productsInWarningDays ?? 0,
          icon: <AlertTriangleIcon className="size-4 dark:text-gray-300" />,
        },
      ],
    },
    {
      title: 'Métricas de Old Stock',
      items: [
        {
          label: 'Totais de produtos em Old Stock',
          value: oldStockMetrics?.totalProductOldStock ?? 0,
          icon: <PackageIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Valor dos produtos em Old Stock',
          value: totalProductsOldStock,
          icon: <DollarSignIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Porcentagem do estoque em Old Stock',
          value: `${oldStockMetrics?.percentageOldStock ?? 0}%`,
          icon: <PieChartIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Expira em 30 dias',
          value: oldStockMetrics?.expiringIn30Days ?? 0,
          icon: <CalendarIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Expira em 60 dias',
          value: oldStockMetrics?.expiringIn60Days ?? 0,
          icon: <ClockIcon className="size-4 dark:text-gray-300" />,
        },
        {
          label: 'Expira em 90 dias',
          value: oldStockMetrics?.expiringIn90Days ?? 0,
          icon: <HourglassIcon className="size-4 dark:text-gray-300" />,
        },
      ],
    },
  ]

  return {
    sections,
  }
}
