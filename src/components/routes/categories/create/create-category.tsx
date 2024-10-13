'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateCategoryType } from '@/validations/create-category-schema'
import { PlusCircle } from 'lucide-react'
import { useCreateCategoryFormField } from './create-category-form-field'
import { useCreateCategory } from './use-create-category'
import { ImageAttachmentInput } from '@/components/image-attachment-input/image-attachment-input'

export function CreateCategory() {
  const { CREATE_CATEGORY_FORM_FIELD } = useCreateCategoryFormField()
  const {
    mutateAsync,
    isPending,
    openDialog,
    setOpenDialog,
    form,
    files,
    setFiles,
    uploadStatus,
  } = useCreateCategory()

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="text-white">
          <PlusCircle className="mr-2 size-4" />
          Criar categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-textPrimary">Criar categoria</DialogTitle>
        <FormRender<CreateCategoryType>
          constant={CREATE_CATEGORY_FORM_FIELD}
          form={form}
          onSubmit={mutateAsync}
        >
          <ImageAttachmentInput
            setFiles={setFiles}
            files={files}
            errorMessage={
              uploadStatus instanceof Error ? uploadStatus.message : undefined
            }
          />
          <div className="flex w-full justify-end space-x-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              Criar
            </Button>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  )
}
