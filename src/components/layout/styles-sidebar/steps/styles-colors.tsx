import { FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IColor, useStyles } from '@/providers/style-provider'
import { FormMessage } from '@/shared/form/form-message'
import { useState } from 'react'
import 'react-color-palette/css'
import { ColorPickerWithLabel } from './color-picker-with-label'

export function CustomStyle() {
  const {
    theme,
    setTheme,
    form: { control },
  } = useStyles()

  type Color = IColor & { name: string }

  const [colors, setColors] = useState<Color[]>(
    Object.entries(theme.paletteColors).map(([_, colorMap]) => {
      const color = Object.values(colorMap)[0]
      return { ...color, name: Object.keys(colorMap)[0] }
    }),
  )

  return (
    <div className="mx-3 my-2 flex flex-1 flex-col gap-2">
      <div className="mb-4 flex items-center">
        <FormField
          control={control}
          name="style.name"
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
          name="style.isActive"
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

      {colors.map((color, index) => {
        if (!color) return null

        const { hex = '', hsv, rgb, name, title = '', description = '' } = color

        const currentColor: IColor = { hex, hsv, rgb }

        return (
          <FormField
            key={name + index}
            control={control}
            name={name as never}
            render={({ field: { onChange } }) => (
              <FormItem>
                <ColorPickerWithLabel
                  key={name}
                  title={title || name}
                  description={description}
                  currentColor={currentColor}
                  onChange={(newColor) => {
                    onChange(newColor.hex)

                    setColors((prevColors) => {
                      const updatedColors = prevColors.map((c) =>
                        c.name === name
                          ? {
                            ...c,
                            hex: newColor.hex,
                            rgb: newColor.rgb,
                            hsv: newColor.hsv,
                          }
                          : c,
                      )

                      setTheme((prevTheme) => ({
                        ...prevTheme,
                        paletteColors: prevTheme.paletteColors.map(
                          (colorMap) =>
                            colorMap[name]
                              ? {
                                ...colorMap,
                                [name]: {
                                  ...colorMap[name],
                                  hex: newColor.hex,
                                  rgb: newColor.rgb,
                                  hsv: newColor.hsv,
                                },
                              }
                              : colorMap,
                        ),
                      }))
                      return updatedColors
                    })
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
    </div>
  )
}
