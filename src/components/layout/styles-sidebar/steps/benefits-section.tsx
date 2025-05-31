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

export function BenefitsSection() {
  const { benefitsForm, benefitsFieldArray, setCurrentStep } =
    useEcommerceManagement()

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize a seção de benefícios</p>
      </div>
      <ScrollArea className="flex-1 pb-4">
        <div className="mx-3 flex flex-col gap-4">
          {benefitsFieldArray.fields.map((field, index, array) => (
            <div
              className="relative flex w-full flex-1 flex-col border-b border-input pb-4 pt-2"
              key={field.id}
            >
              {(index !== 0 || array.length >= 2) && (
                <TooltipRoot>
                  <TooltipTrigger
                    asChild
                    onClick={() => benefitsFieldArray.remove(index)}
                  >
                    <ImageMinus
                      className="absolute right-0 cursor-pointer text-zinc-700 hover:text-destructive dark:text-white"
                      size={14}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Remover benefício
                  </TooltipContent>
                </TooltipRoot>
              )}

              <FormField
                control={benefitsForm.control}
                name={`benefits.${index}.text`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do benefício</FormLabel>
                    <Input {...field} />
                    {benefitsForm.formState.errors?.benefits?.[index]?.text && (
                      <p className="text-sm text-destructive">
                        {
                          benefitsForm.formState.errors?.benefits?.[index]?.text
                            ?.message
                        }
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={benefitsForm.control}
                name={`benefits.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do benefício</FormLabel>
                    <Input {...field} />
                    {benefitsForm.formState.errors?.benefits?.[index]
                      ?.description && (
                      <p className="text-sm text-destructive">
                        {
                          benefitsForm.formState.errors?.benefits?.[index]
                            ?.description?.message
                        }
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={benefitsForm.control}
                name={`benefits.${index}.fileId`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Ícone do benefício (somente SVG)</FormLabel>
                    <FileInput
                      multiple={false}
                      accept=".svg,image/svg+xml"
                      placeholder={
                        benefitsForm.watch(`benefits.${index}.filename`) ??
                        'Escolha um arquivo SVG'
                      }
                      name={field.name}
                      onClick={() => {
                        benefitsForm.resetField(`benefits.${index}.fileId`)
                        benefitsForm.resetField(`benefits.${index}.file`)
                        benefitsForm.resetField(`benefits.${index}.filename`)
                      }}
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0]
                        if (file) {
                          benefitsForm.setValue(`benefits.${index}.file`, file)
                          benefitsForm.setValue(
                            `benefits.${index}.filename`,
                            file.name,
                          )
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
            disabled={benefitsFieldArray.fields.length >= 4}
            onClick={() => {
              benefitsFieldArray.append({
                text: '',
                fileId: '',
                description: '',
                file: undefined,
                filename: '',
              })
            }}
          >
            <ImagePlus size={14} /> Adicionar benefício
          </Button>
          <Button
            className="flex gap-2"
            type="button"
            onClick={async () => {
              const isValid = await benefitsForm.trigger()
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
