'use client'

import { useUpdateProduct } from './use-update-product'
import { Button } from '@/components/ui/button'
import { useUpdateProductFormField } from './use-update-product-form-field'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { UpdateProductType } from '@/validations/update-product-schema'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'

export function UpdateProductForm() {
  const { UPDATE_PRODUCT_FORM_FIELD } = useUpdateProductFormField()
  const router = useRouter()

  const { form, isPending, mutateAsync } = useUpdateProduct()

  return (
    <FormRender<UpdateProductType>
      constant={UPDATE_PRODUCT_FORM_FIELD}
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

        <Button type="submit" isLoading={isPending}>
          Criar
        </Button>
      </div>
    </FormRender>
  )
}
