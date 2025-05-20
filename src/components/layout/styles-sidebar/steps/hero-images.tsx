import { ImageAttachmentInput } from "@/components/image-attachment-input/image-attachment-input"
import { Button } from "@/components/ui/button"
import { FileInput } from "@/components/ui/file-input"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TooltipContent, TooltipRoot, TooltipTrigger } from "@/components/ui/tooltip"
import { useEcommerceManagement } from "@/providers/ecommerce-management-provider"
import { RenderField } from "@/shared/form/form-field-dynamic/RenderField"
import { Tooltip } from "@radix-ui/react-tooltip"
import { ImageMinus, ImagePlus, Save } from "lucide-react"
import { useState } from "react"

export function HeroImages() {
    const { heroForm, heroFieldArray } = useEcommerceManagement()

    const [files, setFiles] = useState<File[]>([])
    console.log(heroForm.formState.errors)

    return (
        <div className="flex flex-col flex-1 h-full">
            <div className="gap-4 border-b border-input py-[14px] pl-3">
                <p className="font-medium">Personalize o conteúdo do carrossel</p>
            </div>
            <ScrollArea className="flex-1 pb-4">

                <div className="mx-3 flex gap-4 flex-col">
                    {heroFieldArray.fields.map((field, index) => (
                        <div className="relative flex flex-1 pt-2 pb-4 border-b border-input w-full flex-col" key={field.id}>

                            {
                                index !== 0 &&
                                <TooltipRoot>
                                    <TooltipTrigger asChild onClick={() => heroFieldArray.remove(field.id as never)}>
                                        <ImageMinus className="absolute right-0 text-zinc-700 dark:text-white hover:text-destructive cursor-pointer" size={14} />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">Remover imagem</TooltipContent>
                                </TooltipRoot>
                            }

                            <FormField control={heroForm.control} name={`hero.${index}.text`} render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Texto do slide</FormLabel>
                                    <Input {...field} />
                                    {
                                        heroForm.formState.errors?.hero?.[index]?.text &&
                                        <p className="text-destructive text-sm">{heroForm.formState.errors?.hero?.[index]?.text?.message}</p>
                                    }
                                </FormItem>
                            } />
                            <FormField control={heroForm.control} name={`hero.${index}.text`} render={() => <FormItem>
                                <FormLabel>Imagem de fundo</FormLabel>
                                <FileInput placeholder="Enviar Imagem" {...field} />
                                {
                                    heroForm.formState.errors?.hero?.[index]?.fileId &&
                                    <p className="text-destructive text-sm">{heroForm.formState.errors?.hero?.[index]?.fileId?.message}</p>
                                }
                            </FormItem>
                            } />
                        </div>)
                    )}
                    <Button
                        type="button"
                        className="flex gap-2 text-primary"
                        variant='outline'
                        onClick={() => {
                            heroFieldArray.append({ text: '', fileId: '' })
                        }}

                    >
                        <ImagePlus size={14} /> Adicionar imagem ao carrossel
                    </Button>
                    <Button
                        className="flex gap-2"
                        type="button"
                        onClick={() => {
                            heroForm.trigger()
                        }}

                    >
                        <Save size={14} />
                        Salvar
                    </Button>
                </div>
            </ScrollArea>
        </div>)
}