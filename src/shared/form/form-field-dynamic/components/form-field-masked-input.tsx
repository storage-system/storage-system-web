'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type ForwardedRef,
} from 'react'
import { Input } from '@/components/ui/input'
import IMask, { type InputMask } from 'imask'

import { type masker } from '@/utils/masker'

type Props = {
  className?: string
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  value?: string
  name: string | number | symbol
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  mask?: ReturnType<typeof masker>
  type?: string
  title?: string
  autoComplete?: string
}

export const FormFieldMaskedInput = forwardRef(
  (
    { mask, onChange, onBlur, value, ...props }: Props,
    _: ForwardedRef<HTMLInputElement | null>,
  ) => {
    const inputRef = useRef(null)
    const maskRef = useRef<InputMask<any> | null>(null)

    function handleOnBlur(e: FocusEvent<HTMLInputElement>) {
      onBlur?.(mask?.unmask(e.target.value) || e.target.value)
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(mask?.unmask(e.target.value) || e.target.value)
    }

    useEffect(() => {
      if (inputRef.current) {
        maskRef.current = IMask(
          inputRef.current,
          mask?.config ?? {
            mask: String,
          },
        )

        // Set initial value if provided
        if (value !== undefined && value !== null && value !== '') {
          maskRef.current.value = mask?.mask(String(value)) ?? String(value)
        }

        // Cleanup function to destroy the IMask instance when the component unmounts
        return () => {
          maskRef.current?.destroy()
        }
      }
    }, [value])

    return (
      <Input
        {...props}
        autoComplete={props.autoComplete ?? 'off'}
        className="h-12 disabled:opacity-80 bg-white dark:bg-black placeholder:text-gray-400"
        name={String(props.name)}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        ref={inputRef}
      />
    )
  },
)

FormFieldMaskedInput.displayName = 'FormFieldMaskedInput'
