import { ListCategory } from '@/@types/category'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
} from '@/components/ui/dialog'
import { SquarePen } from 'lucide-react'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import {
  UpdateCategoryType,
  updateCategorySchema,
} from '@/validations/update-category-schema'
import { useCreateCategoryFormField } from '../../create/create-category-form-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useCategoriesService } from '@/services/categories'
import { queryClient } from '@/utils/query-client'
import { useState } from 'react'
import { categoriesQueryKey } from '@/constants/query-key/categories-query-key'
import { useMutation } from '@tanstack/react-query'

interface Props {
  row: ListCategory
}

export function UpdateCategoryCell({ row }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  const { updateCategoryService } = useCategoriesService()
  const { CREATE_CATEGORY_FORM_FIELD } = useCreateCategoryFormField()

  const categoryId = row.id

  const form = useForm<UpdateCategoryType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: row.name,
      isActive: row.isActive,
    },
  })

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [categoriesQueryKey.LIST_CATEGORIES],
    })
    form.reset({})
    setOpenDialog(false)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateCategoryType) =>
      updateCategoryService(categoryId, data),
    onSuccess: handleSuccess,
  })

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <TooltipRoot>
          <TooltipTrigger>
            <SquarePen className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </TooltipRoot>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Editar categoria</DialogHeader>
        <FormRender<UpdateCategoryType>
          constant={CREATE_CATEGORY_FORM_FIELD}
          form={form}
          onSubmit={mutateAsync}
        >
          <div className="w-full flex justify-end space-x-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              Editar
            </Button>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  )
}
