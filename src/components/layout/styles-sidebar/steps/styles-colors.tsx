import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  CurrentStep,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'
import { Save } from 'lucide-react'
import 'react-color-palette/css'
import { ColorPickerWithLabel } from './color-picker-with-label'

export function CustomStyle() {
  const {
    colors,
    setColors,
    createStyleForm: { control, formState, trigger },
    setCurrentStep,
  } = useEcommerceManagement()

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize o estilo do seu site</p>
      </div>
      <ScrollArea className="flex-1 pb-4">
        <div className="mx-3 flex flex-col gap-4">
          <div className="my-2 flex flex-1 flex-col gap-2">
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
                    {formState.errors?.name && (
                      <p className="text-sm text-destructive">
                        {formState.errors.name.message}
                      </p>
                    )}
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
                          c.colorId === color.colorId
                            ? { ...c, ...newColor }
                            : c,
                        ),
                      )
                    }}
                  />
                )}
              />
            ))}
          </div>

          <Button
            className="flex gap-2"
            type="button"
            onClick={async () => {
              const isValid = await trigger()
              isValid && setCurrentStep(CurrentStep.INITIAL)
            }}
          >
            <Save size={14} />
            Salvar Estilo
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
