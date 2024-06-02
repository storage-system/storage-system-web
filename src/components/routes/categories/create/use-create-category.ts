import { categoriesQueryKey } from '@/constants/query-key/categories-query-key'
import { useCategoriesService } from '@/services/categories'
import { queryClient } from '@/utils/query-client'
import { CreateCategoryType, createCategorySchema } from '@/validations/create-category-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreateCategory() {
  const [openDialog, setOpenDialog] = useState(false)

  const { createCategoryService } = useCategoriesService()

  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      isActive: true,
    },
  });

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [categoriesQueryKey.LIST_CATEGORIES],
    })
    form.reset({})
    setOpenDialog(false)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategoryService,
    onSuccess: handleSuccess
  })

  return {
    mutateAsync,
    isPending,
    openDialog,
    setOpenDialog,
    form,
  }
}