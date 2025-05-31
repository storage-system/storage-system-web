'use client'

import { OldStockCards } from './old-stock/old-stock-cards'
import { ExpirationChart } from './old-stock/expiration-chart'
import { CriticalProductsList } from './old-stock/critical-products-list'
import { ExpiredProductsTable } from './old-stock/expired-products-table'
import { useOldStockMetrics } from './use-old-stock-metrics'
import Loading from '@/app/loading'
import { StockHistory } from '../products/manage-stock/stock-history'

export function OldStockMetrics() {
  const { oldStockMetrics, odStockMetricsLoading, movements } =
    useOldStockMetrics()

  if (odStockMetricsLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-8 pt-4">
      <OldStockCards
        atRiskValue={oldStockMetrics?.atRiskValue}
        criticalCount={oldStockMetrics?.criticalCount}
        expiredCount={oldStockMetrics?.expiredCount}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpirationChart data={oldStockMetrics?.expirationChartData ?? []} />
        <CriticalProductsList
          warningProducts={oldStockMetrics?.warningProducts ?? []}
          expiredProducts={oldStockMetrics?.expiredProducts ?? []}
          criticalProducts={oldStockMetrics?.criticalProducts ?? []}
        />
      </div>

      <ExpiredProductsTable
        expiredProductsData={oldStockMetrics?.expiredProducts ?? []}
      />

      <StockHistory movements={movements} />
    </div>
  )
}
