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

export interface ExpirationChartDaum {
  name: string
  quantidade: number
  color: string
}

export interface ProductBase {
  id: string
  name: string
  dueDate: Date
  daysToExpire: number
  quantity: number
  price: number
  status: string
  category: string
}

export interface OldStockMetrics {
  expiredCount: number
  criticalCount: number
  atRiskValue: number
  expirationChartData: ExpirationChartDaum[]
  criticalProducts: ProductBase[]
  expiredProducts: ProductBase[]
  warningProducts: ProductBase[]
}

export interface CategoryOverviewMetric {
  name: string
  value: number
  color: string
}

export interface DateData {
  periodo: string
  fabricacao: number
  validade: number
  vencidos: number
}

export interface StockGeneralMetrics {
  totalProducts: number
  activeCategories: number
  totalValue: number
  activeProducts: number
  criticalStockProducts: number
  validProducts: number
  categoryOverview: CategoryOverviewMetric[]
  dateData: DateData[]
}
