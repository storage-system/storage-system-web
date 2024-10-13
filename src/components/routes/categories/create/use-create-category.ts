import { toast } from '@/components/ui/use-toast'
import { categoriesQueryKey } from '@/constants/query-key/categories-query-key'
import { useCategoriesService } from '@/services/categories'
import { useFilesService } from '@/services/files'
import { queryClient } from '@/utils/query-client'
import {
  CreateCategoryInput,
  CreateCategoryType,
  createCategorySchema,
} from '@/validations/create-category-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function useCreateCategory() {
  const [openDialog, setOpenDialog] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState<string | Error>('')

  const { uploadFileService } = useFilesService()
  const { createCategoryService } = useCategoriesService()

  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      isActive: true,
    },
  })

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [categoriesQueryKey.LIST_CATEGORIES],
    })
    form.reset({})
    setOpenDialog(false)
  }

  async function handleCreateCategory(anInput: CreateCategoryInput) {
    try {
      const fileIds = await handleUploadFiles(files)
      await createCategoryService({ ...anInput, fileId: fileIds[0] })
    } catch (error) {
      if (uploadStatus instanceof Error) {
        toast({ variant: 'destructive', title: uploadStatus.message })
      }
    } finally {
      setUploadStatus('')
    }
  }

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleCreateCategory,
    onSuccess: handleSuccess,
  })

  return {
    isPending,
    openDialog,
    form,
    setOpenDialog,
    mutateAsync,
    files,
    setFiles,
    uploadStatus,
  }
}
