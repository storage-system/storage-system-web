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

  const getColorByType = (colorType: ColorIdEnum) =>
    colors.find((color) => color.colorId === colorType)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)

  return (
    <header
      className="flex w-full flex-col items-center"
      style={{ backgroundColor }}
    >
      <div
        className="flex w-full max-w-[1200px] flex-wrap justify-between py-3 text-sm sm:text-base"
        style={{ color: textColor }}
      >
        <div className="flex flex-wrap items-center gap-1">
          <MapPin />
          <span className="text-xs sm:text-base">
            Local da Loja: Lincoln - 344, Illinois, Chicago, EUA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            PT <ChevronDown className="size-4" />
          </div>
          <Separator
            orientation="vertical"
            className="hidden h-4 w-[1.5px] sm:block"
            style={{ backgroundColor: secondaryColor }}
          />
          <p className="hidden sm:block">
            <a
              href="#"
              style={{ color: primaryColor }}
              className="transition-opacity hover:opacity-80"
            >
              Entrar
            </a>{' '}
            /{' '}
            <a
              href="#"
              style={{ color: primaryColor }}
              className="transition-opacity hover:opacity-80"
            >
              Cadastrar-se
            </a>
          </p>
        </div>
      </div>

      <Separator
        className="h-[1.5px] w-full"
        style={{ backgroundColor: secondaryColor }}
      />

      <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 py-4">
        <a
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          href="#"
          style={{ color: textColor }}
        >
          <Image src="/logo.png" width={32} height={32} alt="Logo" />
          <span className="text-xl sm:text-3xl">Logo aqui</span>
        </a>

        <div className="hidden rounded-md focus-within:outline-none sm:basis-96 md:flex">
          <input
            className="flex-1 rounded-l-md border px-4 py-2 text-sm focus:outline-none"
            type="text"
            placeholder="Pesquisar"
            style={{
              borderColor: secondaryColor || '#d1d5db',
              backgroundColor,
              color: textColor,
            }}
          />
          <Button
            className="rounded-l-none text-sm"
            style={{
              backgroundColor: primaryColor,
              color: backgroundColor,
            }}
          >
            Buscar
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Heart
            className="hidden cursor-pointer transition-opacity hover:opacity-80 sm:block"
            style={{ color: textColor }}
          />
          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1.5px] sm:block"
            style={{ backgroundColor: secondaryColor }}
          />
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag style={{ color: textColor }} />
              <p
                className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: primaryColor,
                  color: backgroundColor,
                }}
              >
                2
              </p>
            </div>
            <div style={{ color: textColor }}>
              <p className="text-sm">Carrinho de compras</p>
              <p
                className="text-sm font-semibold"
                style={{ color: primaryColor }}
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
