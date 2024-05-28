import { categoriesService } from '@/services/categories'
import { useMutation } from '@tanstack/react-query'

export function useCreateCategory() {
  const { createCategoryService } = categoriesService()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCategoryService
  })

  return {
    mutateAsync,
    isPending
  }
}