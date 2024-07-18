import { UserRoles } from '@/constants/roles/user-roles'

export interface User {
  name: string
  email: string
  phone: string
  roles: UserRoles[]
  createdAt: string
  updatedAt: string
  companyId?: string
}

export interface ListUsers extends User {
  id: string
}
