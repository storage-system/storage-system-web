import { Product } from '@/@types/product'
import { toast } from '@/components/ui/use-toast'
import { productErrorMessages } from '@/constants/product/product-error-messages'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useProductsService } from '@/services/product'
import {
  UpdateProductType,
  updateProductSchema,
} from '@/validations/update-product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { parseISO } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useUpdateProduct() {
  const [openDialog, setOpenDialog] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { id }: { id: string } = useParams()

  const { getProductByIdService, updateProductService } = useProductsService()

  const companyId = session?.user.companyId

  const form = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      batch: '',
      categoryIds: [],
      companyId: '',
      description: '',
      depth: '',
      height: '',
      width: '',
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

  const { data: product } = useQuery({
    queryKey: [productsQueryKey.LIST_PRODUCTS],
    queryFn: () => getProductByIdService(id),
  })

  function handleFillFields(product: Product) {
    companyId && form.setValue('companyId', companyId)
    form.setValue('batch', product.batch)
    form.setValue('categoryIds', product.categoryIds)
    form.setValue('companyId', product.companyId)
    form.setValue('description', product.description)
    form.setValue('depth', product.dimensions.depth)
    form.setValue('height', product.dimensions.height)
    form.setValue('width', product.dimensions.width)
    form.setValue('discountPercentage', product.discountPercentage)
    form.setValue('finalPrice', product.finalPrice)
    form.setValue('manufactureDate', parseISO(product.manufactureDate))
    form.setValue('manufacturer', product.manufacturer)
    form.setValue('name', product.name)
    form.setValue('originalPrice', product.originalPrice)
    form.setValue('quantityInStock', product.quantityInStock)
    form.setValue('status', product.status)
    form.setValue('unitOfMeasure', product.unitOfMeasure)
    form.setValue('validityInDays', product.validityInDays)
    form.setValue('weight', product.weight)
  }

  useEffect(() => {
    if (product) {
      handleFillFields(product)
    }
  }, [product])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProductService,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  async function handleSuccess() {
    form.reset({}, { keepValues: false })
    router.push(PrivateRoutes.PRODUCT)
    setOpenDialog(false)
    toast(productErrorMessages.updateSuccess)
  }

  function handleError() {
    toast(productErrorMessages.updateError)
  }

  return { openDialog, isPending, form, mutateAsync, setOpenDialog }
}
