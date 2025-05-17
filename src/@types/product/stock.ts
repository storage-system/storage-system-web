export type StockOperation = 'INCREASE' | 'DECREASE'

export interface UpdateProductStockRequest {
  productId: string
  quantity: number
  operation: StockOperation
}

export interface UpdateStockRequest {
  quantity: number
  operation: StockOperation
  performedBy: string
}
