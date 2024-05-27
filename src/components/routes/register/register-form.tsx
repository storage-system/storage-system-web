"use client"

import { FormRender } from "@/shared/form/form-field-dynamic/FormRender";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { PrivateRoutes } from "@/constants/routes/private-routes";
import { PublicRoutes } from "@/constants/routes/public-routes";
import { CreateAccountType } from "@/validations/create-account-schema";
import { useRegisterFormField } from "./register-form-field";

export function RegisterForm() {
  const { form, REGISTER_FORM_FIELD } = useRegisterFormField()

  async function onSubmit({ email, password }: CreateAccountType) {
    signIn('credentials', {
      email,
      password,
      callbackUrl: PrivateRoutes.HOME,
    })
  }

  return (
    <FormRender<CreateAccountType>
      constant={REGISTER_FORM_FIELD}
      form={form}
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col space-y-4">
        <Button className="w-full" type="submit">Entrar</Button>
        <p className="text-sm">Já tem uma conta ?
          <Link href={PublicRoutes.SIGN_IN} className="text-primary ml-1 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </FormRender>
  )
}