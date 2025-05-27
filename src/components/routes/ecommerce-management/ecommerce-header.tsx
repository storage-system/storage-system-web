'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, Heart, MapPin, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { NavBar } from './ecommerce-navbar'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

export function Header() {
  const { colors } = useEcommerceManagement()

  // Função helper para buscar cor por ID
  const getColorByType = (colorType: ColorIdEnum) => {
    return colors.find((color) => color.colorId === colorType)?.hex || ''
  }

  // Extrair cores específicas
  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)
  // const tertiaryColor = getColorByType(ColorIdEnum.TERTIARY_COLOR)

  return (
    <header
      className="flex w-full flex-col items-center"
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      <div
        className="flex w-full max-w-[1200px] flex-wrap justify-between py-3 text-sm sm:text-base"
        style={{ color: textColor || undefined }}
      >
        <div className="flex flex-wrap items-center gap-1">
          <MapPin />
          <span className="text-xs sm:text-base">
            Local da Loja: Lincoln- 344, Illinois, Chicago, EUA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            PT <ChevronDown className="size-4" />
          </div>
          <Separator
            orientation="vertical"
            className="hidden h-4 w-[1.5px] sm:block"
            style={{ backgroundColor: secondaryColor || undefined }}
          />
          <p className="hidden sm:block">
            <a
              href=""
              style={{ color: primaryColor || undefined }}
              className="transition-opacity hover:opacity-80"
            >
              Entrar
            </a>{' '}
            /{' '}
            <a
              href=""
              style={{ color: primaryColor || undefined }}
              className="transition-opacity hover:opacity-80"
            >
              Cadastrar-se
            </a>
          </p>
        </div>
      </div>
      <Separator
        className="h-[1.5px] w-full"
        style={{ backgroundColor: secondaryColor || undefined }}
      />
      <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 py-4">
        <a
          className="flex items-center gap-1 transition-opacity hover:opacity-80"
          href=""
          style={{ color: textColor || undefined }}
        >
          <Image src={'/logo.png'} width={32} height={32} alt="Logo" />
          <span className="text-xl sm:text-3xl">Logo aqui</span>
        </a>
        <div className="hidden rounded-md focus-within:outline focus-within:outline-2 sm:basis-96 md:flex">
          <input
            className="flex-1 rounded-l-md border px-4 py-2 text-sm focus:outline-none"
            type="text"
            placeholder="Pesquisar"
            style={{
              borderColor: secondaryColor || '#d1d5db',
              backgroundColor: backgroundColor || 'white',
              color: textColor || 'black',
            }}
          />
          <Button
            className="rounded-l-none text-sm focus:outline-none"
            style={{
              backgroundColor: primaryColor || undefined,
              color: backgroundColor || 'white',
            }}
          >
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Heart
            className="hidden cursor-pointer transition-opacity hover:opacity-80 sm:block"
            style={{ color: textColor || undefined }}
          />
          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1.5px] sm:block"
            style={{ backgroundColor: secondaryColor || undefined }}
          />
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag style={{ color: textColor || undefined }} />
              <p
                className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full text-sm"
                style={{
                  backgroundColor: primaryColor || '#3b82f6',
                  color: backgroundColor || 'white',
                }}
              >
                2
              </p>
            </div>
            <div style={{ color: textColor || undefined }}>
              <p className="text-sm">Carrinho de compras</p>
              <p
                className="text-sm font-semibold"
                style={{ color: primaryColor || undefined }}
              >
                R$ 57,00
              </p>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </header>
  )
}
