import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { type ControllerRenderProps } from 'react-hook-form'

import { type FormFields } from '@/@types/form-field'

import { FormFieldInputDefault } from './components/form-field-input-default'
import { FormFieldMaskedInput } from './components/form-field-masked-input'
import { FormFieldNumber } from './components/form-field-number'
import { FormFieldRadio } from './components/form-field-radio'
import { FormFieldSelect } from './components/form-field-select'
import { FormFieldSwitch } from './components/form-field-switch'
import { FormFieldTextarea } from './components/form-field-textarea'
import { FormFieldPassword } from './components/form-field-password'

interface Props<T> {
  field: ControllerRenderProps<T | any>
  slot: FormFields<any>
}

export function FormFieldDynamic<T>({ field, slot }: Props<T>) {
  switch (slot.type) {
    case 'masked':
      return (
        <FormFieldMaskedInput
          {...field}
          {...slot}
          onChange={(e) => {
            slot.onChange?.(e)
            field.onChange(e)
          }}
          title={slot.label}
          value={field.value ?? ''}
        />
      )
    case 'radio':
      return <FormFieldRadio field={field} slot={slot} />
    case 'select':
      return slot?.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <FormFieldSelect field={field} slot={slot} />
      )
    case 'switch':
      return <FormFieldSwitch field={field} slot={slot} />
    case 'textarea':
      return <FormFieldTextarea field={field} slot={slot} />
    case 'number':
      return <FormFieldNumber field={field} slot={slot} />
    case 'password':
      return <FormFieldPassword field={field} slot={slot} />
    case 'hidden':
      return <Input {...field} type="hidden" />
    default:
      return slot.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <FormFieldInputDefault field={field} slot={slot} />
      )
  }
}
