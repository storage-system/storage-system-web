import { toast } from '@/components/ui/use-toast'
import { productErrorMessages } from '@/constants/product/product-toast-messages'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useProductsService } from '@/services/product'
import {
  createProductSchema,
  CreateProductType,
} from '@/validations/create-category-schema_1'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreateProduct() {
  const [openDialog, setOpenDialog] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const { createProductService } = useProductsService()

  const companyId = session?.user.companyId

  const form = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      batch: '',
      categoryIds: [],
      companyId: '',
      description: '',
      dimensions_depth: '',
      dimensions_height: '',
      dimensions_width: '',
      discountPercentage: '' as any,
      finalPrice: '' as any,
      manufactureDate: null as any,
      manufacturer: '',
      name: '',
      originalPrice: '' as any,
      quantityInStock: '' as any,
      status: '' as any,
      unitOfMeasure: '' as any,
      validityInDays: '' as any,
      weight: '' as any,
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProductService,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  async function handleSuccess() {
    // await queryClient.invalidateQueries({
    //   queryKey: [categoriesQueryKey.],
    // })
    form.reset({}, { keepValues: false })
    router.push(PrivateRoutes.PRODUCT)
    setOpenDialog(false)
    toast(productErrorMessages.createSuccess)
  }

  function handleError() {
    toast(productErrorMessages.createError)
  }

  companyId && form.setValue('companyId', companyId)

  return { openDialog, isPending, form, mutateAsync, setOpenDialog }
}
