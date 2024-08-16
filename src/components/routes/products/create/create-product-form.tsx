'use client'

import { useCreateProduct } from './use-create-product'
import { Button } from '@/components/ui/button'
import { useCreateProductFormField } from './use-create-product-form-field'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateProductType } from '@/validations/create-category-schema_1'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { LoadingSpinner } from '@/components/loading-spinner'

export function CreateProductForm() {
  const { CREATE_PRODUCT_FORM_FIELD } = useCreateProductFormField()
  const router = useRouter()

  const { form, isPending, mutateAsync } = useCreateProduct()

  return (
    <FormRender<CreateProductType>
      constant={CREATE_PRODUCT_FORM_FIELD}
      form={form}
      onSubmit={mutateAsync}
    >
      <div className="flex w-full justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(PrivateRoutes.PRODUCT)}
        >
          Cancelar
        </Button>

        <Button type="submit" disabled={isPending}>
          {!isPending ? 'Criar' : <LoadingSpinner />}
        </Button>
      </div>
    </FormRender>
  )
}
