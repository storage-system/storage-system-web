'use client'

import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PublicRoutes } from '@/constants/routes/public-routes'
import { CreateCompanyType } from '@/validations/create-company-schema'
import { Dispatch, SetStateAction } from 'react'
import { useCompanyRegistrationFormField } from './use-company-registration-form-field'

interface CompanyRegistrationFormProps {
  companyData?: CreateCompanyType
  setCompanyData: Dispatch<SetStateAction<CreateCompanyType | undefined>>
  nextStep: () => void
  prevStep: () => void
}

export function CompanyRegistrationForm({
  nextStep,
  prevStep,
  companyData,
  setCompanyData,
}: CompanyRegistrationFormProps) {
  const { form, REGISTRATION_FORM_FIELD } = useCompanyRegistrationFormField({
    companyData,
  })

  function handleStoreCompanyData(data: CreateCompanyType) {
    setCompanyData(data)
    nextStep()
  }

  return (
    <FormRender<CreateCompanyType>
      constant={REGISTRATION_FORM_FIELD}
      form={form}
      onSubmit={handleStoreCompanyData}
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
