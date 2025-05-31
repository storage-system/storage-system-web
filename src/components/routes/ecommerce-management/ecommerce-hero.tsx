'use client'

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/utils/class-name'
import { useEffect, useRef, useState } from 'react'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'
import { useWatch } from 'react-hook-form'

export function Hero() {
  const { colors, heroForm } = useEcommerceManagement()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const getColorByType = (colorType: ColorIdEnum) =>
    colors.find((color) => color.colorId === colorType)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)

  const heroData =
    useWatch({
      control: heroForm.control,
      name: 'hero',
    }) || []

  // Ref para armazenar os object URLs
  const urlMapRef = useRef(new Map<File, string>())

  // Cleanup das URLs ao desmontar
  useEffect(() => {
    return () => {
      urlMapRef.current.forEach((url) => URL.revokeObjectURL(url))
      urlMapRef.current.clear()
    }
  }, [])

  const getImageUrl = (item: any): string => {
    if (item.file) {
      const cached = urlMapRef.current.get(item.file)
      if (cached) return cached

      const objectUrl = URL.createObjectURL(item.file)
      urlMapRef.current.set(item.file, objectUrl)
      return objectUrl
    }

    return item.fileUrl || '/hero-1.png'
  }

  const heroItems = heroData.length
    ? heroData.map((item) => ({
        ...item,
        imageUrl: getImageUrl(item),
      }))
    : [
        {
          text: 'Sou um título. Clique aqui para editar e adicionar seu próprio texto.',
          imageUrl: '/hero-1.png',
        },
      ]

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    const handleSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', handleSelect)
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  return (
    <div className="relative h-[600px] w-full">
      <CarouselComponent
        opts={{ loop: true }}
        setApi={setApi}
        className="size-full"
      >
        <CarouselContent className="h-[600px]">
          {heroItems.map((heroItem, index) => (
            <CarouselItem
              key={index}
              className="relative flex h-full justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroItem.imageUrl})`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    backgroundColor && backgroundColor !== '#ffffff'
                      ? `${backgroundColor}33`
                      : 'rgba(0,0,0,0.5)',
                }}
              />
              <div className="relative z-10 flex w-full max-w-[1200px] items-center px-8">
                <div className="flex flex-col gap-10">
                  <p
                    className="w-2/3 text-4xl font-semibold sm:text-6xl"
                    style={{
                      color: textColor || '#ffffff',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                    }}
                  >
                    {heroItem.text ||
                      'Sou um título. Clique aqui para editar e adicionar seu próprio texto.'}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselComponent>

      {/* Indicadores do carrossel */}
      <div className="absolute inset-x-0 bottom-8">
        <div className="py-2 text-center text-sm">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'mx-1 inline-block size-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110',
                current === index + 1
                  ? 'opacity-100'
                  : 'opacity-50 hover:opacity-75',
              )}
              style={{
                backgroundColor:
                  current === index + 1
                    ? primaryColor || '#ffffff'
                    : secondaryColor || '#94a3b8',
              }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
