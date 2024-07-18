'use client'
import { FormFieldsConstant } from '@/@types/form-field'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateUserType } from '@/validations/create-user-schema'
import { useForm } from 'react-hook-form'

export default function Testes() {
  const form = useForm()

  const frameworks = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ]

  const REGISTER_FORM_FIELD: FormFieldsConstant<CreateUserType> = [
    [
      {
        name: 'roles',
        label: 'Nome',
        className: 'col-span-full',
        placeholder: 'Teste',
        type: 'combobox',
        multiple: false,
        options: frameworks,
      },
    ],
  ]

  return (
    <FormRender<CreateUserType>
      constant={REGISTER_FORM_FIELD}
      form={form}
      onSubmit={() => {}}
    />
  )
}
