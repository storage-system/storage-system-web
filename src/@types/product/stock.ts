export type StockOperation = 'ADD' | 'REMOVE'

export interface Product {
  id: string
  name: string
  currentStock: number
  description?: string
  sku?: string
  category?: string
}

export interface StockMovement {
  id: string
  productId: string
  productName: string
  quantity: number
  operation: StockOperation
  timestamp: Date
  performedBy?: string
}

export interface UpdateProductStockRequest {
  productId: string
  quantity: number
  operation: StockOperation
}
