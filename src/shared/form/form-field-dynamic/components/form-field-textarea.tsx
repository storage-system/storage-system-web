import { Textarea } from '@/components/ui/textarea'
import { type ControllerRenderProps } from 'react-hook-form'

import { type IFormFieldSelectTextareaSlot } from '@/@types/form-field'

interface FormFieldTextareaProps {
  slot: IFormFieldSelectTextareaSlot
  field: ControllerRenderProps<any>
}

export function FormFieldTextarea({ field, slot }: FormFieldTextareaProps) {
  return (
    <Textarea
      {...field}
      aria-label={slot.label as never}
      className="disabled:bg-background disabled:opacity-100 dark:bg-black"
      disabled={slot.disabled}
      placeholder={slot.placeholder as never}
      title={slot.label as never}
    />
  )
}
