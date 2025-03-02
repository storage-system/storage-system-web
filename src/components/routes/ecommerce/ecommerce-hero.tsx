'use client'

import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name'
import { useEffect, useState } from 'react'

export function Hero() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="relative h-[600px] w-full">
      <CarouselComponent
        opts={{ loop: true }}
        setApi={setApi}
        className="size-full"
      >
        <CarouselContent className="h-[600px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="flex h-full justify-center bg-[url(/hero-1.png)] bg-cover bg-center"
            >
              <div className="flex w-full max-w-[1200px] items-center">
                <div className="flex flex-col gap-10">
                  <p className="w-2/3 text-6xl font-semibold text-white">
                    Sou um título. Clique aqui para editar e adicionar seu
                    próprio texto.
                  </p>
                  <Button
                    variant={'outline'}
                    className="w-1/6 rounded-3xl bg-transparent text-background"
                  >
                    Compre agora
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselComponent>
      <div className="absolute inset-x-0 bottom-8">
        <div className="py-2 text-center text-sm text-muted-foreground ">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={cn(
                'mx-1 inline-block size-2 rounded-full',
                current === index + 1 ? 'bg-white' : 'bg-gray-400',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
