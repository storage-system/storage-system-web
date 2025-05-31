'use client'

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEcommerce } from '@/providers/ecommerce-provider'
import { cn } from '@/utils/class-name'
import { useEffect, useState } from 'react'

export function Hero() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const { config, activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const textColor = activeStyle?.textColor || '#000000'
  const primaryColor = activeStyle?.primaryColor || '#000000'
  const secondaryColor = activeStyle?.secondaryColor || '#94a3b8'

  useEffect(() => {
    if (!api) return

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

  return (
    <div className="relative h-[600px] w-full">
      <CarouselComponent
        opts={{ loop: true }}
        setApi={setApi}
        className="size-full"
      >
        <CarouselContent className="h-[600px]">
          {config.hero.map((hero, index) => (
            <CarouselItem
              key={index}
              className="relative flex h-full justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${hero.fileUrl || '/hero-1.png'})`,
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
                      color: textColor,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                    }}
                  >
                    {hero.text ||
                      'Sou um título. Clique aqui para editar e adicionar seu próprio texto.'}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselComponent>

      {/* Indicadores clicáveis */}
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
                  current === index + 1 ? primaryColor : secondaryColor,
              }}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
