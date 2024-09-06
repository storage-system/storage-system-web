import { StatusProduct } from './status-product'

export interface Product {
  name: string
  description: string
  originalPrice: number
  finalPrice: number
  discountPercentage: number
  quantityInStock: number
  manufactureDate: string
  validityInDays: number
  unitOfMeasure: string
  weight: number
  dimensions_height: string
  dimensions_width: string
  dimensions_depth: string
  manufacturer: string
  batch: string
  status: StatusProduct
  companyId: string
  categoryIds: string[]
}

export interface ListProduct extends Product {
  id: string
}
