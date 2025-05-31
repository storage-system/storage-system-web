import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/file-input'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  CurrentStep,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'
import { ImageMinus, ImagePlus } from 'lucide-react'

export function HeroImages() {
  const { heroForm, heroFieldArray, setCurrentStep } = useEcommerceManagement()

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize o conteúdo do carrossel</p>
      </div>
      <ScrollArea className="flex-1 pb-4">
        <div className="mx-3 flex flex-col gap-4">
          {heroFieldArray.fields.map((field, index, array) => (
            <div
              className="relative flex w-full flex-1 flex-col border-b border-input pb-4 pt-2"
              key={field.id}
            >
              {(index !== 0 || array.length >= 2) && (
                <TooltipRoot>
                  <TooltipTrigger
                    asChild
                    onClick={() => heroFieldArray.remove(index)}
                  >
                    <ImageMinus
                      className="absolute right-0 cursor-pointer text-zinc-700 hover:text-destructive dark:text-white"
                      size={14}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">Remover imagem</TooltipContent>
                </TooltipRoot>
              )}

              <FormField
                control={heroForm.control}
                name={`hero.${index}.text`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Texto do slide</FormLabel>
                    <Input {...field} />
                    {heroForm.formState.errors?.hero?.[index]?.text && (
                      <p className="text-sm text-destructive">
                        {
                          heroForm.formState.errors?.hero?.[index]?.text
                            ?.message
                        }
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={heroForm.control}
                name={`hero.${index}.fileId`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Imagem de fundo</FormLabel>
                    <FileInput
                      placeholder={
                        heroForm.watch(`hero.${index}.filename`) ??
                        'Escolha uma imagem'
                      }
                      name={field.name}
                      onClick={() => {
                        heroForm.resetField(`hero.${index}.file`)
                        heroForm.resetField(`hero.${index}.filename`)
                      }}
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0]
                        if (file) {
                          heroForm.setValue(`hero.${index}.file`, file)
                          heroForm.setValue(`hero.${index}.filename`, file.name)
                        }
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-destructive">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            className="flex gap-2 text-primary"
            variant="outline"
            onClick={() => {
              heroFieldArray.append({
                text: '',
                fileId: '',
                file: undefined,
                filename: '',
              })
            }}
          >
            <ImagePlus size={14} /> Adicionar imagem ao carrossel
          </Button>
          <Button
            className="flex gap-2"
            type="button"
            onClick={async () => {
              const isValid = await heroForm.trigger()
              if (isValid) {
                setCurrentStep(CurrentStep.INITIAL)
              }
            }}
          >
            Confirmar
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
