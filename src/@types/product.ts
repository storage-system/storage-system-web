import { StatusProduct } from './status-product'

export interface AttachmentProps {
  id: string
  filename: string
  type: string
  url: string
}

export interface DimensionsProduct {
  height: string
  width: string
  depth: string
}

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
  ecommerceId: string
  dimensions: DimensionsProduct
  manufacturer: string
  batch: string
  status: StatusProduct
  companyId: string
  categoryIds: string[]
  attachments: AttachmentProps[]
  dueDate: string
}

export interface ListProduct extends Product {
  id: string
}
