import { FormFieldsConstant } from '@/@types/form-field'
import { usersQueryKey } from '@/constants/query-key/users-query-key'
import { useUsersService } from '@/services/user'
import { telMask } from '@/utils/masker'
import { CreateCompanyType } from '@/validations/create-company-schema'
import { useQuery } from '@tanstack/react-query'

export function useCreateCompanyFormField() {
  const { fetchUsersService } = useUsersService()
  const { data: users } = useQuery({
    queryKey: [usersQueryKey.LIST_ALL_USERS],
    queryFn: async () => {
      const { items } = await fetchUsersService()
      return items
    },
  })
  const userList = users ?? []
  const formattedUserList = userList?.map((user) => ({
    label: user.name,
    value: user.id,
  }))

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
        placeholder: '(99) 99999-9999',
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
        options: formattedUserList,
      },
    ],
    [
      {
        name: 'password',
        label: 'Senha',
        className: 'col-span-full',
        placeholder: '⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎',
        type: 'password',
      },
    ],
  ]

  return {
    CREATE_COMPANY_FORM_FIELD,
  }
}
