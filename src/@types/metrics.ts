import { ReactNode } from "react";

export type ItemsSectionsType = {
  label: string;
  value: number | string;
  icon: ReactNode;
};

export type SectionsType = {
  title: string;
  items: ItemsSectionsType[];
};

export interface ExpirationChartDaum {
  name: string;
  quantidade: number;
  color: string;
}

export interface ProductBase {
  id: string;
  name: string;
  dueDate: Date;
  daysToExpire: number;
  quantity: number;
  price: number;
  status: string;
  category: string;
}

export interface OldStockMetrics {
  expiredCount: number;
  criticalCount: number;
  atRiskValue: number;
  expirationChartData: ExpirationChartDaum[];
  criticalProducts: ProductBase[];
  expiredProducts: ProductBase[];
  warningProducts: ProductBase[];
}

export interface ProductMetrics {
  totalStockQuantity: number;
  totalStockValue: number;
  productsInWarningDays: number;
}

export interface Metrics {
  oldStockMetrics: OldStockMetrics;
  productMetrics: ProductMetrics;
}
