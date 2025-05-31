'use client'

import { Archive, Package, TrendingUp } from 'lucide-react'
import { StatsCard } from './stats-card'
import { CategoryOverview } from './general-stock/category-overview'
import { CategoryBarChart } from './general-stock/category-bar-chart'
import { ManufacturingDateChart } from './general-stock/manufacturing-date-chart'
import { StockSummaryMetrics } from './general-stock/stock-summary-metrics'
import Loading from '@/app/loading'
import { useGeneralStockMetrics } from './use-general-stock-metrics'

export function NewStockMetrics() {
  const { generalStockMetrics, generalStockMetricsLoading } =
    useGeneralStockMetrics()

  if (generalStockMetricsLoading) {
    return <Loading />
  }

  const totalValueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(generalStockMetrics?.totalValue ?? 0)

  return (
    <div className="space-y-8 pt-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Produtos"
          value={generalStockMetrics?.totalProducts ?? 0}
          description="produtos cadastrados"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Categorias Ativas"
          value={generalStockMetrics?.activeCategories ?? 0}
          description="categorias cadastradas"
          icon={Archive}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Valor Total"
          value={totalValueFormatted}
          description="valor do estoque"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Produtos Ativos"
          value={generalStockMetrics?.activeProducts ?? 0}
          description="produtos em bom estado"
          icon={Package}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <StockSummaryMetrics
        criticalStockProducts={generalStockMetrics?.criticalStockProducts ?? 0}
        validProducts={generalStockMetrics?.validProducts ?? 0}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CategoryOverview data={generalStockMetrics?.categoryOverview ?? []} />
        <CategoryBarChart data={generalStockMetrics?.categoryOverview ?? []} />
        <ManufacturingDateChart data={generalStockMetrics?.dateData ?? []} />
      </div>
    </div>
  )
}
