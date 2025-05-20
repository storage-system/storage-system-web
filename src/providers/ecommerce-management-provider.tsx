'use client'
import { Form } from '@/components/ui/form'
import {
  createStyleSchema,
  CreateStyleType,
} from '@/validations/create-style-schema'
import { heroSchema, HeroType } from '@/validations/publish-ecommerce-schema'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form'

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

interface EcommerceManagementContext {
  currentStep: CurrentStep
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>
  colors: IColor[]
  setColors: Dispatch<SetStateAction<IColor[]>>
  createStyleForm: UseFormReturn<CreateStyleType>
  heroForm: UseFormReturn<HeroType>
  heroFieldArray: UseFieldArrayReturn<HeroType>
}

export const EcommerceManagementContext =
  createContext<EcommerceManagementContext | null>(null)

interface EcommerceManagementProviderProps {
  initialColorConfig: IColor[]
  children: ReactNode
}

export function EcommerceManagementProvider({
  children,
  initialColorConfig = [],
}: EcommerceManagementProviderProps) {
  const { data: session } = useSession()

  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )

  const [colors, setColors] = useState<IColor[]>(initialColorConfig)

  const form = useForm<CreateStyleType>({})

  const createStyleForm = useForm<CreateStyleType>({
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

  const heroForm = useForm<HeroType>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      hero: [
        {
          text: '',
          fileId: '',
        },
      ],
    },
  })

  const heroFieldArray = useFieldArray({
    name: 'hero',
    control: heroForm.control,
  })

  return (
    <EcommerceManagementContext.Provider
      value={{
        currentStep,
        colors,
        createStyleForm,
        heroForm,
        heroFieldArray,
        setCurrentStep,
        setColors,
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => {})}>{children}</form>
      </Form>
    </EcommerceManagementContext.Provider>
  )
}

export function useEcommerceManagement(): EcommerceManagementContext {
  const context = useContext(EcommerceManagementContext)
  if (!context) {
    throw new Error(
      'useEcommerceManagement must be used within an EcommerceManagementProvider.',
    )
  }
  return context
}
