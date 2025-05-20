import { FormField } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEcommerceManagement } from '@/providers/ecommerce-management-provider'
import { FormMessage } from '@/shared/form/form-message'
import { useEffect } from 'react'
import 'react-color-palette/css'
import { ColorPickerWithLabel } from './color-picker-with-label'

export function CustomStyle() {
  const {
    colors,
    setColors,
    createStyleForm: { control, formState },
  } = useEcommerceManagement()

  useEffect(() => {
    console.log(formState.errors)
  }, [formState.errors])

  return (
    <div className="mx-3 my-2 flex flex-1 flex-col gap-2">
      <div className="mb-4 flex items-center">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <div className="flex-1">
              <input
                autoComplete="off"
                className="w-full text-xl text-primary outline-none"
                placeholder="Nome do estilo"
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />
        <FormField
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ...field } }) => (
            <TooltipRoot>
              <TooltipTrigger asChild>
                <div>
                  <Switch
                    className="text-2xl text-primary outline-none"
                    checked={!!value}
                    onCheckedChange={onChange}
                    {...field}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Estilo ativo?</TooltipContent>
            </TooltipRoot>
          )}
        />
      </div>

      {colors.map((color, index) => (
        <FormField
          key={color.colorId + index}
          control={control}
          name={color.colorId}
          render={({ field: { onChange } }) => (
            <ColorPickerWithLabel
              key={color.colorId}
              title={color.title}
              description={color.description}
              currentColor={color}
              onChange={(newColor) => {
                onChange(newColor.hex)
                setColors((prevColors) =>
                  prevColors.map((c) =>
                    c.colorId === color.colorId ? { ...c, ...newColor } : c,
                  ),
                )
              }}
            />
          )}
        />
      ))}
    </div>
  )
}
