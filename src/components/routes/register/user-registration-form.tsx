'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { CreateUserType } from '@/validations/create-user-schema'
import { useRegistrationFormField } from './use-user-registration-form-field'
import { Dispatch, SetStateAction } from 'react'

interface RegistrationFormProps {
  userData?: CreateUserType
  setUserData: Dispatch<SetStateAction<CreateUserType | undefined>>
  nextStep: () => void
}

export function RegistrationForm({
  nextStep,
  userData,
  setUserData,
}: RegistrationFormProps) {
  const { form, REGISTRATION_FORM_FIELD } = useRegistrationFormField({
    userData,
  })

  function handleStoreUserData(data: CreateUserType) {
    console.log(setUserData)
    setUserData(data)
    nextStep()
  }

  return (
    <FormRender<CreateUserType>
      constant={REGISTRATION_FORM_FIELD}
      form={form}
      onSubmit={handleStoreUserData}
    >
      <div className="flex items-center justify-end space-y-4">
        <Button className="" type="submit">
          Proximo passo
        </Button>
      </div>
      <p className="text-sm">
        Já tem uma conta ?
        <Link
          href={PublicRoutes.SIGN_IN}
          className="ml-1 text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </FormRender>
  )
}
