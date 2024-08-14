import {
  createProductSchema,
  CreateProductType,
} from '@/validations/create-category-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreateProduct() {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
  })

  return { openDialog, form, setOpenDialog }
}
