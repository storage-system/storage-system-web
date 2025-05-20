import { Form } from '@/components/ui/form'
import { useStylesService } from '@/services/styles'
import {
  CreateStyleOutput,
  createStyleSchema,
  CreateStyleType,
} from '@/validations/create-style-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
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
  HERO_IMAGES = 'hero-images',
}

export enum ColorIdEnum {
  BACKGROUND_COLOR = 'backgroundColor',
  TEXT_COLOR = 'textColor',
  PRIMARY_COLOR = 'primaryColor',
  SECONDARY_COLOR = 'secondaryColor',
  TERTIARY_COLOR = 'tertiaryColor',
}
interface IColor extends ColorType {
  colorId: ColorIdEnum
  description: string
  title: string
}

interface StylesContext {
  currentStep: CurrentStep
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>
  colors: IColor[]
  setColors: Dispatch<SetStateAction<IColor[]>>
  form: UseFormReturn<CreateStyleType>
}

export const StylesContext = createContext<StylesContext | null>(null)

interface StylesProviderProps {
  initialColorConfig: IColor[]
  children: ReactNode
}

export function StylesProvider({
  children,
  initialColorConfig = [],
}: StylesProviderProps) {
  const { data: session } = useSession()

  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )

  const [colors, setColors] = useState<IColor[]>(initialColorConfig)

  const form = useForm<CreateStyleType>({
    resolver: zodResolver(createStyleSchema),
    defaultValues: {
      companyId: session?.user.companyId ?? '',
      isActive: false,
      backgroundColor: initialColorConfig.find(
        (color) => color.colorId === ColorIdEnum.BACKGROUND_COLOR,
      )?.hex,
      textColor: initialColorConfig.find(
        (color) => color.colorId === ColorIdEnum.TEXT_COLOR,
      )?.hex,
      primaryColor: initialColorConfig.find(
        (color) => color.colorId === ColorIdEnum.PRIMARY_COLOR,
      )?.hex,
      secondaryColor: initialColorConfig.find(
        (color) => color.colorId === ColorIdEnum.SECONDARY_COLOR,
      )?.hex,
      tertiaryColor: initialColorConfig.find(
        (color) => color.colorId === ColorIdEnum.TERTIARY_COLOR,
      )?.hex,
    },
  })

  const { createStyleService } = useStylesService()
  async function handleCreateStyle(input: CreateStyleOutput) {
    await createStyleService(input)
  }

  const { mutateAsync } = useMutation({
    mutationFn: handleCreateStyle,
  })

  return (
    <StylesContext.Provider
      value={{ currentStep, colors, form, setCurrentStep, setColors }}
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
