'use client'

import { OldStockCards } from './old-stock/old-stock-cards'
import { ExpirationChart } from './old-stock/expiration-chart'
import { CriticalProductsList } from './old-stock/critical-products-list'
import { ExpiredProductsTable } from './old-stock/expired-products-table'
import { RecentActivity } from './old-stock/recent-activity'

export function OldStockMetrics() {
  return (
    <div className="space-y-8 pt-4">
      <OldStockCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpirationChart />
        <CriticalProductsList />
      </div>

      <ExpiredProductsTable />

      <RecentActivity />
    </div>
  )
}
