'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { Dispatch, SetStateAction } from 'react'
import { useAddressRegistrationFormField } from './use-address-registration-form-field'
import { CreateCompanyAddressType } from '@/validations/create-company-schema'

interface AddressRegistrationFormProps {
  companyAdressData?: CreateCompanyAddressType
  setAddressData: Dispatch<SetStateAction<CreateCompanyAddressType | undefined>>
  submit: () => void
  prevStep: () => void
}

export function AddressRegistrationForm({
  submit,
  prevStep,
  companyAdressData,
  setAddressData,
}: AddressRegistrationFormProps) {
  const { form, REGISTRATION_FORM_FIELD } = useAddressRegistrationFormField({
    companyAdressData,
  })

  function handleStoreAddressData(data: CreateCompanyAddressType) {
    setAddressData(data)
    submit()
  }

  return (
    <FormRender<CreateCompanyAddressType>
      constant={REGISTRATION_FORM_FIELD}
      form={form}
      onSubmit={handleStoreAddressData}
    >
      <div className="flex items-center justify-between space-y-4">
        <Button type="button" onClick={() => prevStep()}>
          Voltar
        </Button>
        <Button type="submit">Próximo passo</Button>
      </div>
      <p className="text-sm">
        Já tem uma conta?
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
