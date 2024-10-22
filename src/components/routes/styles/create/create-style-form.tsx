'use client'

import { useCreateProduct } from './use-create-product'
import { Button } from '@/components/ui/button'
import { useCreateProductFormField } from './use-create-product-form-field'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateProductType } from '@/validations/create-product-schema'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { ImageAttachmentInput } from '@/components/image-attachment-input/image-attachment-input'
export function CreateProductForm() {
  const { CREATE_PRODUCT_FORM_FIELD } = useCreateProductFormField()
  const router = useRouter()

  const { form, isPending, mutateAsync, files, setFiles } = useCreateProduct()

  return (
    <FormRender<CreateProductType>
      constant={CREATE_PRODUCT_FORM_FIELD}
      form={form}
      onSubmit={mutateAsync}
    >
      <ImageAttachmentInput files={files} setFiles={setFiles} />
      <div className="flex w-full justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(PrivateRoutes.PRODUCT)}
        >
          Cancelar
        </Button>

        <Button type="submit" isLoading={isPending}>
          Criar
        </Button>
      </div>
    </FormRender>
  )
}
