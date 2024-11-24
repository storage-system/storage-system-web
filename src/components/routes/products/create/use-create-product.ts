import { toast } from '@/components/ui/use-toast'
import { productErrorMessages } from '@/constants/product/product-error-messages'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useFilesService } from '@/services/files'
import { useProductsService } from '@/services/product'
import {
  CreateProductInput,
  CreateProductType,
  createProductSchema,
} from '@/validations/create-product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreateProduct() {
  const [files, setFiles] = useState<File[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | Error>('')
  const { data: session } = useSession()
  const router = useRouter()

  const { createProductService } = useProductsService()
  const { uploadFileService } = useFilesService()

  const companyId = session?.user.companyId

  const form = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema),
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

  async function handleUploadFiles(files: File[]) {
    try {
      setUploadStatus('Enviando imagem ...')
      const fileIds = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.set('file', file)

          return await uploadFileService(formData)
        }),
      )

      setUploadStatus('Imagem enviada com sucesso')
      setFiles([])
      return fileIds.map((fileId) => fileId.id)
    } catch (error) {
      setUploadStatus(
        new Error(
          'Falha ao enviar imagens, por favor tente novamente mais tarde!',
        ),
      )
      return []
    }
  }

  async function handleCreateProduct(anInput: CreateProductInput) {
    try {
      const fileIds = await handleUploadFiles(files)
      await createProductService({
        ...anInput,
        fileIds,
      })
    } catch (error) {
      if (uploadStatus instanceof Error) {
        toast({ variant: 'destructive', title: uploadStatus.message })
      }
    } finally {
      setUploadStatus('')
    }
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleCreateProduct,
    onSuccess: handleSuccess,
    onError: handleError,
  })

  async function handleSuccess() {
    form.reset({}, { keepValues: false })
    router.push(PrivateRoutes.PRODUCT)
    setOpenDialog(false)
    toast(productErrorMessages.createSuccess)
  }

  function handleError() {
    toast(productErrorMessages.createError)
  }

  companyId && form.setValue('companyId', companyId)

  return {
    openDialog,
    isPending,
    form,
    mutateAsync,
    setOpenDialog,
    files,
    setFiles,
    uploadStatus,
  }
}
