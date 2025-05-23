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
  heroSchema,
  HeroType,
  publishEcommerceSchema,
  PublishEcommerceType,
} from '@/validations/publish-ecommerce-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import html2canvas from 'html2canvas'
import { useParams, useRouter } from 'next/navigation'
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
  initialForm: UseFormReturn<PublishEcommerceType>
  createStyleForm: UseFormReturn<CreateStyleType>
  fileNames: { fieldId: string; filename: string; file: File; fileId: string }[]
  setFileNames: Dispatch<
    SetStateAction<
      { fieldId: string; filename: string; file: File; fileId: string }[]
    >
  >
  heroForm: UseFormReturn<HeroType>
  heroFieldArray: UseFieldArrayReturn<HeroType>
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

  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )
  const [fileNames, setFileNames] = useState<
    { fieldId: string; filename: string; file: File; fileId: string }[]
  >([])

  const [colors, setColors] = useState<IColor[]>(initialColorConfig)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  const previewRef = useRef<HTMLDivElement>(null)

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

  const uploadPreviewImage = useMutation({
    mutationFn: async (imageDataUrl: string): Promise<string | null> => {
      const response = await fetch(imageDataUrl)
      const blob = await response.blob()

      const timestamp = new Date().getTime()
      const file = new File([blob], `style-preview-${timestamp}.png`, {
        type: 'image/png',
      })

      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await uploadFileService(formData)
      return uploadResponse.id
    },
    onSuccess: (fileId) => {
      initialForm.setValue('ecommercePreview', fileId ?? undefined)
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer upload da imagem de preview',
      })
    },
  })

  const initialForm = useForm<PublishEcommerceType>({
    resolver: zodResolver(publishEcommerceSchema),
  })

  const createStyleForm = useForm<CreateStyleType>({
    resolver: zodResolver(createStyleSchema),
    defaultValues: {
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

  const router = useRouter()
  const { publishEcommerceService, getEcommerce } =
    useEcommerceManagementService()

  const { id }: { id: string } = useParams()

  const activeEcommerceQuery = useQuery({
    queryKey: ['active-ecommerce', id],
    queryFn: getEcommerce,
    enabled: !!id,
  })

  const publishEcommerce = useMutation({
    mutationFn: async (data: PublishEcommerceType) => {
      return await publishEcommerceService(data)
    },
    onSuccess: () => {
      toast({
        title: 'E-commerce publicado com sucesso!',
        description: 'Seu e-commerce está agora disponível para o público.',
      })
      router.push(PrivateRoutes.ECOMMERCE_MANAGEMENT)
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Erro ao publicar o e-commerce',
        description: 'Tente novamente mais tarde.',
      })
    },
  })

  const isLoading =
    publishEcommerce.isPending || uploadPreviewImage.isPending || isCapturing

  useEffect(() => {
    console.log(activeEcommerceQuery.data)
    if (id && activeEcommerceQuery.data) {
      const { hero, name, styles } = activeEcommerceQuery.data

      initialForm.reset({
        name,
      })

      heroForm.reset({
        hero: hero.map((item) => ({
          text: item.text,
          fileId: item.fileId,
        })),
      })

      const activeStytle = styles.find((style) => style.isActive)

      if (activeStytle) {
        createStyleForm.reset({
          name: activeStytle.name,
          isActive: activeStytle.isActive,
          backgroundColor: activeStytle.backgroundColor,
          textColor: activeStytle.textColor,
          primaryColor: activeStytle.primaryColor,
          secondaryColor: activeStytle.secondaryColor,
          tertiaryColor: activeStytle.tertiaryColor,
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
        isLoading,
        fileNames,
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

            if (!isInitialValid || !isStyleValid || !isHeroValid) {
              console.warn('Algum formulário é inválido.')
              return
            }

            // Capturar e fazer upload da imagem de preview
            const capturedImage = await capturePreview()
            const uploadedPreviewId = null

            if (capturedImage) {
              await uploadPreviewImage.mutateAsync(capturedImage)
            }

            const initialData = initialForm.getValues()
            const styleData = createStyleForm.getValues()
            const heroData = heroForm.getValues()

            const allData = {
              ...initialData,
              style: {
                ...styleData,
                previewFileId: uploadedPreviewId, // Incluir o ID do arquivo de preview
              },
              hero: heroData.hero,
            }

            // Processar os dados com o ID da imagem de preview
            publishEcommerce.mutate(allData)
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
