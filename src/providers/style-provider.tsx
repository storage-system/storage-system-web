import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useEcommerceManagementService } from '@/services/ecommerce-management'
import { createStyleSchema } from '@/validations/create-style-schema'
import { PublishEcommerceOutput } from '@/validations/publish-ecommerce-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { IColor as ColorType } from 'react-color-palette'
import { useForm, UseFormReturn } from 'react-hook-form'

export enum CurrentStep {
  INITIAL = 'initial',
  CUSTOM_THEME = 'custom-theme',
}

export enum ColorIdEnum {
  BACKGROUND_COLOR = 'backgroundColor',
  TEXT_COLOR = 'textColor',
  PRIMARY_COLOR = 'primaryColor',
  SECONDARY_COLOR = 'secondaryColor',
  TERTIARY_COLOR = 'tertiaryColor',
}

export interface IColor extends ColorType {
  description?: string
  title?: string
}

export interface Theme {
  title: string
  description: string
  paletteColors: { [key: string]: IColor }[]
}

interface StylesContext {
  currentStep: CurrentStep
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  form: UseFormReturn<PublishEcommerceOutput>
  isPreview: boolean
  isPending: boolean
}

export const StylesContext = createContext<StylesContext | null>(null)

interface StylesProviderProps {
  initialTheme: Theme
  children: ReactNode
}

export function StylesProvider({
  children,
  initialTheme,
}: StylesProviderProps) {
  const pathname = usePathname()

  const isPreview = pathname.includes('styles')
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )

  const [colors, setTheme] = useState<Theme>(initialTheme)

  const form = useForm<PublishEcommerceOutput>({
    resolver: zodResolver(createStyleSchema),
    defaultValues: {
      style: {
        isActive: false,
        ...colors,
      },
    },
  })

  const { publishEcommerce } = useEcommerceManagementService()
  async function handlePublishEcommerce(input: PublishEcommerceOutput) {
    await publishEcommerce(input)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handlePublishEcommerce,
    onSuccess: () => {
      router.push(PrivateRoutes.STYLES)
      toast({
        title: 'Estilo criado com sucesso!',
        variant: 'success',
      })
    },
  })

  return (
    <StylesContext.Provider
      value={{
        currentStep,
        theme: colors,
        form,
        isPreview,
        setCurrentStep,
        setTheme,
        isPending,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutateAsync(data))}>
          {children}
        </form>
      </Form>
    </StylesContext.Provider>
  )
}

export function useStyles(): StylesContext {
  const context = useContext(StylesContext)
  if (!context) {
    throw new Error('useStyles must be used within a StylesProvider.')
  }
  return context
}
