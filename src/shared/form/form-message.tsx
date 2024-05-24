'use client'

import { useFormField } from '@/components/ui/form'

export function FormMessage() {
  const { error, formMessageId } = useFormField()
  const message = error?.message

  if (!message) {
    return null
  }

  return (
    <p
      className="text-sm font-medium text-red500"
      id={formMessageId}
    >
      {message}
    </p>
  )
}
