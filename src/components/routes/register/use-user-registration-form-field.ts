import { FormFieldsConstant } from '@/@types/form-field'
import { telMask } from '@/utils/masker'
import {
  CreateUserInput,
  CreateUserType,
  createUserSchema,
} from '@/validations/create-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useRegistrationFormField() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  })

  const REGISTRATION_FORM_FIELD: FormFieldsConstant<CreateUserType> = [
    [
      {
        name: 'name',
        label: 'Nome',
        className: 'col-span-full',
        placeholder: 'Ex: Pedro Veras',
        type: 'text',
      },
    ],
    [
      {
        name: 'email',
        label: 'Email',
        className: 'col-span-full',
        placeholder: 'Ex: johndoe@example.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'phone',
        label: 'Contato',
        className: 'col-span-full',
        placeholder: 'Ex: (62) 9 9999 9999',
        type: 'masked',
        mask: telMask,
      },
    ],
    [
      {
        name: 'password',
        label: 'Senha',
        className: 'col-span-full',
        placeholder: 'Ex: **********',
        type: 'password',
      },
    ],
  ]

  return {
    form,
    REGISTRATION_FORM_FIELD,
  }
}
