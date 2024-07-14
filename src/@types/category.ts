export interface Category {
  name: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ListCategory extends Category {
  id: string
}
