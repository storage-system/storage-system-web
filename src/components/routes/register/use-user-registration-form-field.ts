import { FormFieldsConstant } from '@/@types/form-field'
import { telMask } from '@/utils/masker'
import {
  CreateUserInput,
  CreateUserType,
  createUserSchema,
} from '@/validations/create-user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useRegistrationFormField({
  userData,
}: {
  userData?: CreateUserInput
}) {
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

  useEffect(() => {
    if (userData) {
      form.setValue('name', userData.name)
      form.setValue('email', userData.email)
      form.setValue('phone', userData.phone)
      form.setValue('password', userData.password)
    }
  }, [userData])

  return {
    form,
    REGISTRATION_FORM_FIELD,
  }
}
