'use client'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { CreateCompanyType } from '@/validations/create-company-schema'
import { useCreateCompanyFormField } from './create-company-form-field'
import { Button } from '@/components/ui/button'
import { useCreateCompany } from './use-create-company'

export function CreateCompanyForm() {
  const { CREATE_COMPANY_FORM_FIELD } = useCreateCompanyFormField()
  const { form, handleCreateCompany, isPending } = useCreateCompany()

  return (
    <FormRender<CreateCompanyType>
      constant={CREATE_COMPANY_FORM_FIELD}
      form={form}
      onSubmit={handleCreateCompany}
    >
      <div className="w-full flex justify-end">
        <Button disabled={isPending}>Cadastrar</Button>
      </div>
    </FormRender>
  )
}
