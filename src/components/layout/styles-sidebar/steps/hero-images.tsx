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
import { useFilesService } from '@/services/files'
import { useMutation } from '@tanstack/react-query'
import { ImageMinus, ImagePlus } from 'lucide-react'

export function HeroImages() {
  const {
    heroForm,
    heroFieldArray,
    setCurrentStep,
    initialForm,
    fileNames,
    setFileNames,
  } = useEcommerceManagement()

  const { uploadFileService } = useFilesService()
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return await uploadFileService(formData)
    },
  })

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
                    onClick={() => heroFieldArray.remove(field.id as never)}
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
                        fileNames.find(
                          (item) => item.fieldId === `hero.${index}.fileId`,
                        )?.filename ?? 'Escolha uma imagem'
                      }
                      name={field.name}
                      onClick={() => {
                        heroForm.resetField(field.name)
                        setFileNames((prev) =>
                          prev.filter(
                            (item) => item.fieldId !== `hero.${index}.fileId`,
                          ),
                        )
                      }}
                      onChange={async (e) => {
                        const input = e.currentTarget
                        const file = input.files?.[0]
                        if (file) {
                          const { id } =
                            await uploadFileMutation.mutateAsync(file)
                          setFileNames((prev) => [
                            ...prev,
                            {
                              fieldId: `hero.${index}.fileId`,
                              filename: file.name,
                              file,
                              fileId: id,
                            },
                          ])
                          field.onChange(id)
                          input.value = ''
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
              heroFieldArray.append({ text: '', fileId: '' })
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
                initialForm.setValue('hero', heroForm.getValues('hero'))
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
