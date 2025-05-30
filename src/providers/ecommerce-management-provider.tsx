'use client'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useEcommerceManagementService } from '@/services/ecommerce-management-service'
import { useFilesService } from '@/services/files'
import {
  createStyleSchema,
  CreateStyleType,
} from '@/validations/create-style-schema'
import {
  benefitsSchema,
  BenefitsType,
  heroSchema,
  HeroType,
  initialFormSchema,
  InitialFormType,
  PublishEcommerceType,
} from '@/validations/publish-ecommerce-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import html2canvas from 'html2canvas'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
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
  BENEFITS_SECTION = 'benefits-section',
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
  initialForm: UseFormReturn<InitialFormType>
  createStyleForm: UseFormReturn<CreateStyleType>
  fileNames: { fieldId: string; filename: string; file: File; fileId: string }[]
  setFileNames: Dispatch<
    SetStateAction<
      { fieldId: string; filename: string; file: File; fileId: string }[]
    >
  >
  benefitFileNames: {
    fieldId: string
    filename: string
    file: File
    fileId: string
  }[]
  setBenefitFileNames: Dispatch<
    SetStateAction<
      { fieldId: string; filename: string; file: File; fileId: string }[]
    >
  >
  heroForm: UseFormReturn<HeroType>
  heroFieldArray: UseFieldArrayReturn<HeroType>
  benefitsForm: UseFormReturn<BenefitsType>
  benefitsFieldArray: UseFieldArrayReturn<BenefitsType>
  previewRef: React.RefObject<HTMLDivElement>
  previewImage: string | null
  isCapturing: boolean
  isLoading: boolean
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
  const { uploadFileService } = useFilesService()
  const { publishEcommerceService, updateEcommerceService, getEcommerce } =
    useEcommerceManagementService()

  const pathname = usePathname()
  const isUpdate = pathname.includes('update')

  const router = useRouter()
  const { id }: { id: string } = useParams()

  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )
  const [fileNames, setFileNames] = useState<
    { fieldId: string; filename: string; file: File; fileId: string }[]
  >([])
  const [benefitFileNames, setBenefitFileNames] = useState<
    { fieldId: string; filename: string; file: File; fileId: string }[]
  >([])
  const [colors, setColors] = useState<IColor[]>(initialColorConfig)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const previewRef = useRef<HTMLDivElement>(null)

  const initialForm = useForm<InitialFormType>({
    resolver: zodResolver(initialFormSchema),
  })

  const createStyleForm = useForm<CreateStyleType>({
    resolver: zodResolver(createStyleSchema),
    defaultValues: {
      name: 'Tema padrão',
      isActive: false,
      backgroundColor: initialColorConfig.find(
        (c) => c.colorId === ColorIdEnum.BACKGROUND_COLOR,
      )?.hex,
      textColor: initialColorConfig.find(
        (c) => c.colorId === ColorIdEnum.TEXT_COLOR,
      )?.hex,
      primaryColor: initialColorConfig.find(
        (c) => c.colorId === ColorIdEnum.PRIMARY_COLOR,
      )?.hex,
      secondaryColor: initialColorConfig.find(
        (c) => c.colorId === ColorIdEnum.SECONDARY_COLOR,
      )?.hex,
      tertiaryColor: initialColorConfig.find(
        (c) => c.colorId === ColorIdEnum.TERTIARY_COLOR,
      )?.hex,
    },
  })

  const heroForm = useForm<HeroType>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      hero: [{ text: '', fileId: '' }],
    },
  })

  const heroFieldArray = useFieldArray({
    name: 'hero',
    control: heroForm.control,
  })

  const benefitsForm = useForm<BenefitsType>({
    resolver: zodResolver(benefitsSchema),
    defaultValues: {
      benefits: [{ text: '', fileId: '' }],
    },
  })

  const benefitsFieldArray = useFieldArray({
    name: 'benefits',
    control: benefitsForm.control,
  })

  const activeEcommerceQuery = useQuery({
    queryKey: ['active-ecommerce', id],
    queryFn: getEcommerce,
    enabled: isUpdate && !!id,
  })

  const publishEcommerce = useMutation({
    mutationFn: publishEcommerceService,
    onSuccess: () => {
      toast({ title: 'Publicado com sucesso!' })
      router.push(PrivateRoutes.ECOMMERCE_MANAGEMENT)
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Erro ao publicar' })
    },
  })

  const updateEcommerce = useMutation({
    mutationFn: updateEcommerceService,
    onSuccess: () => {
      toast({ title: 'Atualizado com sucesso!' })
      router.push(PrivateRoutes.ECOMMERCE_MANAGEMENT)
    },
    onError: () => {
      toast({ variant: 'destructive', title: 'Erro ao atualizar' })
    },
  })

  const isLoading =
    publishEcommerce.isPending || updateEcommerce.isPending || isCapturing

  const capturePreview = async (): Promise<string | null> => {
    if (!previewRef.current) return null

    try {
      setIsCapturing(true)
      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            const canvas = await html2canvas(previewRef.current!, {
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: null,
            })
            const imageUrl = canvas.toDataURL('image/png')
            setPreviewImage(imageUrl)
            resolve(imageUrl)
          } catch (error) {
            console.error('Erro ao capturar imagem:', error)
            resolve(null)
          } finally {
            setIsCapturing(false)
          }
        }, 800)
      })
    } catch (error) {
      console.error('Erro ao iniciar captura:', error)
      setIsCapturing(false)
      return null
    }
  }

  const handleCreate = async () => {
    const capturedImage = await capturePreview()
    if (capturedImage) {
      const fileId = await uploadImage(capturedImage)
      if (fileId) initialForm.setValue('ecommercePreview', fileId)
    }

    const data: PublishEcommerceType = {
      ...initialForm.getValues(),
      style: createStyleForm.getValues(),
      hero: heroForm.getValues().hero,
      benefits: benefitsForm.getValues().benefits,
    }

    publishEcommerce.mutate(data)
  }

  const handleUpdate = async () => {
    const capturedImage = await capturePreview()
    if (capturedImage) {
      const fileId = await uploadImage(capturedImage)
      if (fileId) initialForm.setValue('ecommercePreview', fileId)
    }

    const data: PublishEcommerceType & { id: string } = {
      ...initialForm.getValues(),
      style: createStyleForm.getValues(),
      hero: heroForm.getValues().hero,
      benefits: benefitsForm.getValues().benefits,
      id,
    }

    updateEcommerce.mutate(data)
  }

  const uploadImage = async (imageDataUrl: string): Promise<string | null> => {
    try {
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()
      const file = new File([blob], `style-preview-${Date.now()}.png`, {
        type: 'image/png',
      })
      const formData = new FormData()
      formData.append('file', file)
      const uploadResponse = await uploadFileService(formData)
      return uploadResponse.id
    } catch (error) {
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    if (activeEcommerceQuery.data) {
      const { name, hero, styles } = activeEcommerceQuery.data

      initialForm.reset({ name })

      heroForm.reset({
        hero: hero.map((h) => ({
          text: h.text,
          fileId: h.fileId,
        })),
      })

      const activeStyle = styles.find((s) => s.isActive)
      if (activeStyle) {
        createStyleForm.reset({
          name: activeStyle.name,
          isActive: activeStyle.isActive,
          backgroundColor: activeStyle.backgroundColor,
          textColor: activeStyle.textColor,
          primaryColor: activeStyle.primaryColor,
          secondaryColor: activeStyle.secondaryColor,
          tertiaryColor: activeStyle.tertiaryColor,
        })
      }
    }
  }, [activeEcommerceQuery.data])

  return (
    <EcommerceManagementContext.Provider
      value={{
        currentStep,
        colors,
        createStyleForm,
        heroForm,
        initialForm,
        heroFieldArray,
        previewRef,
        previewImage,
        isCapturing,
        benefitsForm,
        benefitsFieldArray,
        isLoading,
        fileNames,
        benefitFileNames,
        setBenefitFileNames,
        setFileNames,
        setCurrentStep,
        setColors,
      }}
    >
      <Form {...initialForm}>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            const isInitialValid = await initialForm.trigger()
            const isStyleValid = await createStyleForm.trigger()
            const isHeroValid = await heroForm.trigger()

            console.log(
              'isInitialValid:',
              isInitialValid,
              initialForm.formState.errors,
            )
            console.log('isStyleValid:', isStyleValid)
            console.log('isHeroValid:', isHeroValid)
            if (!isInitialValid || !isStyleValid || !isHeroValid) {
              toast({ variant: 'destructive', title: 'Formulário inválido' })
              return
            }

            if (isUpdate) {
              await handleUpdate()
            } else {
              await handleCreate()
            }
          }}
        >
          {children}
        </form>
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
