'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { useAuthenticateFormField } from './authenticate-form-field'
import { AuthenticateType } from '@/validations/authenticate-schema'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { useRouter } from 'next/navigation'
import { signinErrorMessages } from '@/constants/sign-in/sign-in-toast-messages'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function AuthenticateForm() {
  const router = useRouter()

  const { form, AUTHENTICATE_FORM_FIELD, alertError, setAlertError } =
    useAuthenticateFormField()

  async function onSubmit({ email, password }: AuthenticateType) {
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((data) => {
      if (data?.ok) {
        router.replace(PrivateRoutes.HOME)
        setAlertError(undefined)
      }
      if (data?.error) {
        setAlertError(signinErrorMessages.invalidCredentials)
      }
    })
  }

  return (
    <FormRender<AuthenticateType>
      constant={AUTHENTICATE_FORM_FIELD}
      form={form}
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col space-y-4">
        {alertError && (
          <Alert variant={alertError.variant as never}>
            <AlertCircle className="size-4" />
            <AlertTitle>{alertError.title}</AlertTitle>
            <AlertDescription>{alertError.text}</AlertDescription>
          </Alert>
        )}
        <Button className="w-full" type="submit">
          Entrar
        </Button>
        <p className="text-sm">
          Ainda não tem uma conta ?
          <Link
            href={PublicRoutes.REGISTER}
            className="ml-1 text-primary hover:underline"
          >
            Crie uma conta
          </Link>
        </p>
      </div>
    </FormRender>
  )
}
