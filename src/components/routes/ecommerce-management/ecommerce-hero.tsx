'use client'

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/utils/class-name'
import { useEffect, useState } from 'react'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'
import { useFilesService } from '@/services/files'
import { useQuery } from '@tanstack/react-query'

export function Hero() {
  const { colors, heroForm } = useEcommerceManagement()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const { getFileUrlService } = useFilesService()

  const getColorByType = (colorType: ColorIdEnum) =>
    colors.find((color) => color.colorId === colorType)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)

  const heroData = heroForm.watch('hero') || []

  useEffect(() => {
    if (!api) {
      return undefined
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    api.on('select', handleSelect)
    return () => {
      api.off('select', handleSelect)
    }
  }, [api])

  const heroItems =
    heroData.length > 0
      ? heroData
      : [
          {
            text: 'Sou um título. Clique aqui para editar e adicionar seu próprio texto.',
            fileId: '',
          },
        ]

  const heroFileIds = heroData.map((item) => item.fileId).filter(Boolean)

  const filesQuery = useQuery({
    queryKey: ['files', heroFileIds],
    queryFn: async () =>
      Promise.all(heroFileIds.map((fileId) => getFileUrlService(fileId))),
    enabled: heroFileIds.length > 0,
  })

  return (
    <div className="relative h-[600px] w-full">
      <CarouselComponent
        opts={{ loop: true }}
        setApi={setApi}
        className="size-full"
      >
        <CarouselContent className="h-[600px]">
          {heroItems.map((heroItem, index) => {
            const fileIdIndex = heroFileIds.findIndex(
              (id) => id === heroItem.fileId,
            )
            const fileUrl =
              fileIdIndex !== -1
                ? filesQuery.data?.[fileIdIndex]?.fileUrl
                : '/hero-1.png'

            return (
              <CarouselItem
                key={index}
                className="relative flex h-full justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${fileUrl})`,
                }}
              >
                <div
                  className="absolute inset-0 bg-black/30"
                  style={{
                    backgroundColor: backgroundColor
                      ? `${backgroundColor}80`
                      : 'rgba(0, 0, 0, 0.3)',
                  }}
                />
                <div className="relative z-10 flex w-full max-w-[1200px] items-center">
                  <div className="flex flex-col gap-10">
                    <p
                      className="w-2/3 text-4xl font-semibold sm:text-6xl"
                      style={{ color: textColor || 'white' }}
                    >
                      {heroItem.text ||
                        'Sou um título. Clique aqui para editar e adicionar seu próprio texto.'}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </CarouselComponent>

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
                    ? primaryColor || 'white'
                    : secondaryColor || '#9ca3af',
              }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
