import { FormFieldsConstant } from '@/@types/form-field'
import { CreateCategoryType } from '@/validations/create-category-schema'

export function useCreateCategoryFormField() {
  const CREATE_CATEGORY_FORM_FIELD: FormFieldsConstant<CreateCategoryType> = [
    [
      {
        name: 'name',
        label: 'Nome da Categoria',
        className: 'col-span-full',
        placeholder: 'Ex: Painéis',
        type: 'text',
      },
    ],
    [
      {
        name: 'isActive',
        label: 'Está ativo(a)',
        className: 'col-span-full space-x-2 items-center justify-center',
        type: 'switch',
      },
    ],
  ]

  return {
    CREATE_CATEGORY_FORM_FIELD,
  }
}
