import { Input } from '@/components/ui/input'
import { type ControllerRenderProps } from 'react-hook-form'

import { type FormFields } from '@/@types/form-field'

interface FormFieldInputDefaultProps {
  field: ControllerRenderProps<any>
  slot: FormFields<any>
}

export function FormFieldInputDefault({
  field,
  slot,
}: FormFieldInputDefaultProps) {
  return (
    <Input
      className="h-12 bg-white placeholder:text-gray-400 dark:bg-black"
      id={field.name as string}
      disabled={slot.disabled}
      onChange={field.onChange}
      placeholder={'placeholder' in slot ? slot.placeholder : ''}
      value={field.value}
      width="full"
    />
  )
}
