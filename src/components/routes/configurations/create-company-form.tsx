'use client'
import { FormRender } from '@/shared/form/form-field-dynamic/FormRender'
import { useCreateConfigurationsFormField } from './create-configuration-form-field'
import { Button } from '@/components/ui/button'
import { useCreateConfigurations } from './use-create-configurations'
import { CreateConfigurationsType } from '@/validations/create-configurations-schema'

export function CreateConfigurationsForm() {
  const { CREATE_CONFIGURATIONS_FORM_FIELD } =
    useCreateConfigurationsFormField()
  const { form, handleCreateConfigurations, isPending } =
    useCreateConfigurations()

  return (
    <FormRender<CreateConfigurationsType>
      constant={CREATE_CONFIGURATIONS_FORM_FIELD}
      form={form}
      onSubmit={handleCreateConfigurations}
    >
      <div className="flex w-full justify-end">
        <Button disabled={isPending}>Cadastrar</Button>
      </div>
    </FormRender>
  )
}
