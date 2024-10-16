import { FormFieldsConstant } from '@/@types/form-field'
import { CNPJMask, telMask } from '@/utils/masker'
import {
  createCompanySchema,
  CreateCompanyType,
} from '@/validations/create-company-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useCompanyRegistrationFormField() {
  const form = useForm<CreateCompanyType>({
    resolver: zodResolver(createCompanySchema),
  })

  const REGISTRATION_FORM_FIELD: FormFieldsConstant<CreateCompanyType> = [
    [
      {
        name: 'name',
        label: 'Nome',
        className: 'col-span-full',
        placeholder: 'Ex: Empresa XYZ',
        type: 'text',
      },
    ],
    [
      {
        name: 'socialReason',
        label: 'Razão Social',
        className: 'col-span-full',
        placeholder: 'Ex: Empresa XYZ Ltda',
        type: 'text',
      },
    ],
    [
      {
        name: 'cnpj',
        label: 'CNPJ',
        className: 'col-span-full',
        placeholder: 'Ex: 00.000.000/0000-00',
        type: 'masked',
        mask: CNPJMask,
      },
    ],
    [
      {
        name: 'email',
        label: 'Email',
        className: 'col-span-full',
        placeholder: 'Ex: contato@empresa.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'contact',
        label: 'Contato',
        className: 'col-span-full',
        placeholder: 'Ex: (62) 9 9999 9999',
        type: 'masked',
        mask: telMask,
      },
    ],
    [
      {
        name: 'responsible',
        label: 'Responsável',
        className: 'col-span-full',
        placeholder: 'Ex: João da Silva',
        type: 'text',
      },
    ],
  ]

  return {
    form,
    REGISTRATION_FORM_FIELD,
  }
}
