'use client'

import { SitePreview } from '@/components/routes/styles/site-preview'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { initialColorConfig } from '@/constants/styles/initial-color-config'
import { ColorIdEnum, StylesProvider, Theme } from '@/providers/style-provider'
import { useEcommerceManagementService } from '@/services/ecommerce-management'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'

export default function Styles() {
  const { retrieveCompanyEcommerce } = useEcommerceManagementService()
  const previewRef = useRef(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [_, setIsCapturing] = useState(false)

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['retrieveCompanyEcommerce'],
    queryFn: async () => await retrieveCompanyEcommerce(),
    retry: false,
  })

  const activeStyle = data?.styles.find((style) => style.isActive)

  const initialColor: Theme = activeStyle
    ? {
        title: activeStyle.name,
        description: 'Este tema é usado em todo o site.',
        paletteColors: [
          {
            [ColorIdEnum.PRIMARY_COLOR]: {
              hex: activeStyle.primaryColor,
              rgb: { r: 59, g: 130, b: 246, a: 1 },
              hsv: { h: 212, s: 76, v: 96, a: 1 },
              title: 'Cor principal',
              description:
                'Aparece nos botões, no preço do produto e nos textos do rodapé.',
            },
          },
          {
            [ColorIdEnum.SECONDARY_COLOR]: {
              hex: activeStyle.secondaryColor,
              rgb: { r: 49, g: 12, b: 78, a: 1 },
              hsv: { h: 268, s: 85, v: 31, a: 1 },
              title: 'Cor secundária',
              description: 'Aparece na barra de anúncio.',
            },
          },
          {
            [ColorIdEnum.TERTIARY_COLOR]: {
              hex: activeStyle.tertiaryColor,
              rgb: { r: 16, g: 185, b: 129, a: 1 },
              hsv: { h: 160, s: 91, v: 73, a: 1 },
              title: 'Cor de destaque',
              description:
                'Aparece nas promoções e nas mensagens de desconto, frete grátis e parcelamento sem juros.',
            },
          },
          {
            [ColorIdEnum.BACKGROUND_COLOR]: {
              hex: activeStyle.backgroundColor,
              rgb: { r: 255, g: 255, b: 255, a: 1 },
              hsv: { h: 0, s: 0, v: 100, a: 1 },
              title: 'Cor de fundo',
              description: 'Define o fundo do site.',
            },
          },
          {
            [ColorIdEnum.TEXT_COLOR]: {
              hex: activeStyle.textColor,
              rgb: { r: 0, g: 0, b: 0, a: 1 },
              hsv: { h: 0, s: 0, v: 0, a: 1 },
              title: 'Cor do texto',
              description: 'Usada para textos principais e subtítulos.',
            },
          },
        ],
      }
    : initialColorConfig

  const capturePreview = async () => {
    if (!previewRef.current) return

    try {
      setIsCapturing(true)

      return new Promise((resolve) => {
        setTimeout(async () => {
          try {
            if (previewRef.current) {
              const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: null,
              })

              const imageUrl = canvas.toDataURL('image/png')
              setPreviewImage(imageUrl)
              resolve(imageUrl)
            }
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

  useEffect(() => {
    if (isSuccess && previewRef.current && !previewImage) {
      const timer = setTimeout(() => {
        capturePreview()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isSuccess, previewRef.current])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          <Link
            href={PrivateRoutes.STYLES + PrivateRoutes.CREATE_STYLES}
            className={buttonVariants({ variant: 'default' })}
          >
            <PlusCircle className="mr-2 size-4" />
            Criar Estilo
          </Link>
        </div>
      </div>

      <div className="relative w-full">
        <div className="mb-2">
          {activeStyle && (
            <div className="flex items-center">
              <span className="mr-2 rounded-sm bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Publicado
              </span>
              <span>{activeStyle.name || 'Nome do site aqui'}</span>
            </div>
          )}
        </div>

        {/* Lógica de exibição condicional baseada no estado de carregamento */}
        {isLoading ? (
          <Card className="flex size-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="size-6 animate-spin text-gray-400" />
              <p className="text-sm text-gray-500">
                Carregando visualização...
              </p>
            </div>
          </Card>
        ) : previewImage ? (
          /* Exibe a imagem capturada quando disponível */
          <Card className="relative size-[400px] overflow-hidden p-2">
            <img
              src={previewImage}
              alt="Preview do site"
              className="w-full object-contain"
            />
          </Card>
        ) : (
          <>
            <Card className="flex size-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="size-6 animate-spin text-gray-400" />
                <p className="text-sm text-gray-500">
                  Carregando visualização...
                </p>
              </div>
            </Card>
            <div
              className="absolute left-0 top-0 opacity-0"
              style={{ position: 'absolute', zIndex: -1 }}
            >
              <StylesProvider initialTheme={initialColor}>
                <div className="relative">
                  <div
                    ref={previewRef}
                    className="absolute left-0 top-0 origin-top-left scale-[30%]"
                  >
                    <SitePreview />
                  </div>
                </div>
              </StylesProvider>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
