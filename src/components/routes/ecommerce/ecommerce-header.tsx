'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, Heart, MapPin, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { NavBar } from './ecommerce-navbar'

export function Header() {
  return (
    <header className="flex w-full flex-col items-center bg-background">
      <div className="flex w-full max-w-[1200px] flex-wrap justify-between py-3 text-sm text-gray-600 sm:text-base">
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
          />
          <p className="hidden sm:block">
            <a href="">Entrar</a> / <a href="">Cadastrar-se</a>
          </p>
        </div>
      </div>
      <Separator className="h-[1.5px] w-full" />
      <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 py-4">
        <a className="flex items-center gap-1" href="">
          <Image src={'/logo.png'} width={32} height={32} alt="Logo" />
          <span className="text-xl sm:text-3xl">Logo aqui</span>
        </a>
        <div className="hidden rounded-md focus-within:outline focus-within:outline-2 sm:basis-96 md:flex">
          <input
            className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-sm  focus:outline-none"
            type="text"
            placeholder="Pesquisar"
          />
          <Button className="rounded-l-none text-sm focus:outline-none">
            Buscar
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Heart className="hidden sm:block" />
          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1.5px] sm:block"
          />
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag />
              <p className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-sm text-background ">
                2
              </p>
            </div>
            <div>
              <p className="text-sm">Carrinho de compras</p>
              <p className="text-sm font-semibold">R$ 57,00</p>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </header>
  )
}
