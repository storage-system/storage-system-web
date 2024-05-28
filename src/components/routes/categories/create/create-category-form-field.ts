import { FormFieldsConstant } from "@/@types/form-field"
import { CreateCategoryType, createCategorySchema } from "@/validations/create-category-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCreateCategoryFormField() {
  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      isActive: true,
    },
  });

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
    form,
    CREATE_CATEGORY_FORM_FIELD
  }
}