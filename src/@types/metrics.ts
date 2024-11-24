import { ReactNode } from 'react'

export type ItemsSectionsType = {
  label: string
  value: number | string
  icon: ReactNode
}

export type SectionsType = {
  title: string
  items: ItemsSectionsType[]
}

export interface OldStockMetrics {
  totalProductOldStock: number
  totalOldStockValue: number
  expiringIn30Days: number
  expiringIn60Days: number
  expiringIn90Days: number
  percentageOldStock: number
}

export interface ProductMetrics {
  totalStockQuantity: number
  totalStockValue: number
  productsInWarningDays: number
}

export interface Metrics {
  oldStockMetrics: OldStockMetrics
  productMetrics: ProductMetrics
}
