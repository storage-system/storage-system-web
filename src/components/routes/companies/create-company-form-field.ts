import { FormFieldsConstant } from '@/@types/form-field'
import { telMask } from '@/utils/masker'
import { CreateCompanyType } from '@/validations/create-company-schema'

export function useCreateCompanyFormField() {
  const userList = [
    {
      label: 'teste1',
      value: '01',
    },
    {
      label: 'teste2',
      value: '02',
    },
    {
      label: 'teste3',
      value: '03',
    },
    {
      label: 'teste4',
      value: '04',
    },
  ]

  const CREATE_COMPANY_FORM_FIELD: FormFieldsConstant<CreateCompanyType> = [
    [
      {
        name: 'name',
        label: 'Nome da Empresa',
        className: 'col-span-7',
        placeholder: 'Ex: Indústria Ltda.',
        type: 'text',
      },
      {
        name: 'email',
        label: 'E-mail',
        className: 'col-span-5',
        placeholder: 'email@example.com',
        type: 'email',
      },
    ],
    [
      {
        name: 'contact',
        label: 'Contato',
        className: 'col-span-4',
        placeholder: 'email@example.com',
        type: 'masked',
        mask: telMask,
      },
      {
        name: 'responsible',
        label: 'Nome do responsável',
        className: 'col-span-8',
        placeholder: 'Ex: José da Silva',
        type: 'text',
      },
    ],
    [
      {
        name: 'users',
        label: 'Usuários',
        className: 'col-span-12',
        placeholder: 'Ex: Indústria Ltda.',
        type: 'combobox',
        multiple: true,
        options: userList,
      },
    ],
  ]

  return {
    CREATE_COMPANY_FORM_FIELD,
  }
}
