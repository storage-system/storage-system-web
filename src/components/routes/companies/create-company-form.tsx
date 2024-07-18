'use client'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateCompanyType } from '@/validations/create-company-schema'
import { useForm } from 'react-hook-form'
import { useCreateCompanyFormField } from './create-company-form-field'

export function CreateCompanyForm() {
  const { CREATE_COMPANY_FORM_FIELD } = useCreateCompanyFormField()
  const form = useForm()

  return (
    <FormRender<CreateCompanyType>
      constant={CREATE_COMPANY_FORM_FIELD}
      form={form}
      onSubmit={() => {}}
    />
  )
}
