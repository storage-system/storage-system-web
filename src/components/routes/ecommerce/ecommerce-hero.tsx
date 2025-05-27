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

  const { config } = useEcommerce()
  const style = config.styles.find((s) => s.isActive)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div
      className="relative h-[600px] w-full"
      style={{ backgroundColor: style?.backgroundColor }}
    >
      <CarouselComponent
        opts={{ loop: true }}
        setApi={setApi}
        className="size-full"
      >
        <CarouselContent className="h-[600px]">
          {config.hero.map((hero, index) => (
            <CarouselItem
              key={index}
              className="flex h-full justify-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${hero.fileUrl})`,
              }}
            >
              <div className="flex w-full max-w-[1200px] items-center">
                <div className="flex flex-col gap-10">
                  <p
                    className="w-2/3 text-6xl font-semibold"
                    style={{ color: style?.textColor }}
                  >
                    {hero.text}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselComponent>

      <div className="absolute inset-x-0 bottom-8">
        <div className="py-2 text-center text-sm">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={cn(
                'mx-1 inline-block size-2 rounded-full transition-colors duration-300',
              )}
              style={{
                backgroundColor:
                  current === index + 1
                    ? style?.primaryColor
                    : style?.tertiaryColor,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
