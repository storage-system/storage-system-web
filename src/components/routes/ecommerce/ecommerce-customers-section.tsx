'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/utils/class-name'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Rating } from './ecommerce-rating'

export function CustomersSection() {
  const [api, setApi] = useState<CarouselApi>()

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex flex-col items-center bg-gray-200">
      <div className="my-24 w-full max-w-[1200px] space-y-12">
        <div className="flex justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              Veja o que nossos clientes dizem
            </h2>
            <CustomPagination currentIndex={current} total={10} />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => api?.scrollPrev()}
              className="size-11 rounded-full p-0"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              onClick={() => api?.scrollNext()}
              className="size-11 rounded-full p-0"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <Rating index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

function CustomPagination({
  currentIndex,
  total,
}: {
  currentIndex: number
  total: number
}) {
  const pages = Math.ceil(total / 3)
  const pagesBreakpoints = Array.from({ length: 3 }, (_, index) =>
    Math.floor((pages / 3) * (index + 1)),
  )

  return (
    <div className="mt-4 flex items-center gap-2">
      <div
        className={cn(
          'h-1 w-6 bg-primary/40 transition-all',
          currentIndex >= pagesBreakpoints[0] && 'bg-primary',
          currentIndex >= pagesBreakpoints[0] &&
            currentIndex < pagesBreakpoints[1] &&
            'w-16',
        )}
      ></div>
      <div
        className={cn(
          'h-1 w-6 bg-primary/40 transition-all',
          currentIndex >= pagesBreakpoints[1] && 'bg-primary',
          currentIndex >= pagesBreakpoints[1] &&
            currentIndex < pagesBreakpoints[2] &&
            'w-16',
        )}
      ></div>
      <div
        className={cn(
          'h-1 w-6 bg-primary/40 transition-all',
          currentIndex >= pagesBreakpoints[2] && 'bg-primary',
          currentIndex >= pagesBreakpoints[2] && 'w-16',
        )}
      ></div>
    </div>
  )
}
