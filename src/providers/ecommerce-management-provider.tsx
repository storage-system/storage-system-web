'use client'
import { Form } from '@/components/ui/form'
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
import { useSession } from 'next-auth/react'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useRef,
} from 'react'
import { IColor as ColorType } from 'react-color-palette'
import {
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import html2canvas from 'html2canvas'
import { useFilesService } from '@/services/files'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { useEcommerceManagementService } from '@/services/ecommerce-management-service'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'

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
  heroForm: UseFormReturn<HeroType>
  heroFieldArray: UseFieldArrayReturn<HeroType>
  previewRef: React.RefObject<HTMLDivElement>
  previewImage: string | null
  isCapturing: boolean
  isLoading: boolean
  previewFileId: string | null
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

  const [colors, setColors] = useState<IColor[]>(initialColorConfig)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [previewFileId, setPreviewFileId] = useState<string | null>(null)
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
  const { publishEcommerceService } = useEcommerceManagementService()

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
        previewFileId,
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
