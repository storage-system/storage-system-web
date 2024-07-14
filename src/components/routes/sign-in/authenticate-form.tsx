'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { useAuthenticateFormField } from './authenticate-form-field'
import { AuthenticateType } from '@/validations/authenticate-schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PublicRoutes } from '@/constants/routes/public-routes'

export function AuthenticateForm() {
  const { form, AUTHENTICATE_FORM_FIELD } = useAuthenticateFormField()

  async function onSubmit({ email, password }: AuthenticateType) {
    signIn('credentials', {
      email,
      password,
      callbackUrl: PrivateRoutes.HOME,
    })
  }

  return (
    <FormRender<AuthenticateType>
      constant={AUTHENTICATE_FORM_FIELD}
      form={form}
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col space-y-4">
        <Button className="w-full" type="submit">
          Entrar
        </Button>
        <p className="text-sm">
          Ainda não tem uma conta ?
          <Link
            href={PublicRoutes.REGISTER}
            className="text-primary ml-1 hover:underline"
          >
            Crie uma conta
          </Link>
        </p>
      </div>
    </FormRender>
  )
}
