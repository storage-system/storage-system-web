'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { useEcommerce } from '@/providers/ecommerce-provider'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Rating } from './ecommerce-rating'

export function CustomersSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const textColor = activeStyle?.textColor || '#1f2937'
  const primaryColor = activeStyle?.primaryColor || '#3b82f6'

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="flex flex-col items-center" style={{ backgroundColor }}>
      <div className="my-24 w-full max-w-[1200px] space-y-12">
        <div className="flex justify-between">
          <div>
            <h2 className="text-4xl font-bold" style={{ color: textColor }}>
              Veja o que nossos clientes dizem
            </h2>
            <CustomPagination
              currentIndex={current}
              total={10}
              primaryColor={primaryColor}
            />
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => api?.scrollPrev()}
              className="size-11 rounded-full p-0"
              style={{
                backgroundColor: `${primaryColor}1A`,
                color: primaryColor,
              }}
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              onClick={() => api?.scrollNext()}
              className="size-11 rounded-full p-0"
              style={{
                backgroundColor: `${primaryColor}1A`,
                color: primaryColor,
              }}
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 6000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <Rating />
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
  primaryColor = '#3b82f6',
}: {
  currentIndex: number
  total: number
  primaryColor?: string
}) {
  const pages = Math.ceil(total / 3)
  const pagesBreakpoints = Array.from({ length: 3 }, (_, index) =>
    Math.floor((pages / 3) * (index + 1)),
  )

  const getStyle = (isActive: boolean, isWide: boolean) => ({
    backgroundColor: isActive ? primaryColor : primaryColor + '66',
    width: isWide ? '4rem' : '1.5rem',
    height: '0.25rem',
    transition: 'all 0.3s',
    borderRadius: '2px',
  })

  return (
    <div className="mt-4 flex items-center gap-2">
      <div
        style={getStyle(
          currentIndex >= pagesBreakpoints[0],
          currentIndex < pagesBreakpoints[1],
        )}
      />
      <div
        style={getStyle(
          currentIndex >= pagesBreakpoints[1],
          currentIndex < pagesBreakpoints[2],
        )}
      />
      <div style={getStyle(currentIndex >= pagesBreakpoints[2], true)} />
    </div>
  )
}
