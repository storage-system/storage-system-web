import { StockOperation } from './stock'

export interface StockMovement {
  id: string
  operation: StockOperation
  quantity: number
  performedBy: string
  product: {
    id: string
    name: string
  }
  timestamp: Date
}
