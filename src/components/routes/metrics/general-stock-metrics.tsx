'use client'

import { Archive, Package, TrendingUp } from 'lucide-react'
import { StatsCard } from './stats-card'
import { CategoryOverview } from './general-stock/category-overview'
import { CategoryBarChart } from './general-stock/category-bar-chart'
import { ManufacturingDateChart } from './general-stock/manufacturing-date-chart'
import { RecentActivity } from './old-stock/recent-activity'
import { StockSummaryMetrics } from './general-stock/stock-summary-metrics'

export function NewStockMetrics() {
  return (
    <div className="space-y-8 pt-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Produtos"
          value="1,234"
          description="produtos cadastrados"
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Categorias Ativas"
          value="8"
          description="categorias cadastradas"
          icon={Archive}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Valor Total"
          value="R$ 45.678"
          description="valor do estoque"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Produtos Ativos"
          value="1,199"
          description="produtos em bom estado"
          icon={Package}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <StockSummaryMetrics />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CategoryOverview />
        <CategoryBarChart />
        <ManufacturingDateChart />
      </div>

      <RecentActivity />
    </div>
  )
}
