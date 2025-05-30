'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/utils/class-name'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useState } from 'react'
import { NewProduct } from './ecommerce-new-product'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

export function NewProductsSection() {
  const productsList: any[] = []

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const { colors } = useEcommerceManagement()
  const getColorByType = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex || ''
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  return (
    <div className="flex flex-col items-center">
      <div className="my-24 w-full max-w-[1200px] space-y-12">
        <div>
          <h2 className="text-4xl font-bold">Novos Produtos</h2>
          <CustomPagination
            currentIndex={current}
            total={10}
            primaryColor={primaryColor}
          />
        </div>
        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {productsList.map((item, index) => (
              <CarouselItem key={index} className="basis-1/5">
                <NewProduct {...item} index={index} />
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
  primaryColor,
}: {
  currentIndex: number
  total: number
  primaryColor: string
}) {
  const pages = Math.ceil(total / 3)
  const pagesBreakpoints = Array.from({ length: 3 }, (_, index) =>
    Math.floor((pages / 3) * (index + 1)),
  )

  return (
    <div className="mt-4 flex items-center gap-2">
      {pagesBreakpoints.map((breakpoint, index) => {
        const isActive = currentIndex >= breakpoint
        const isWider =
          index < 2 &&
          currentIndex >= breakpoint &&
          currentIndex < pagesBreakpoints[index + 1]

        return (
          <div
            key={index}
            className={cn('h-1 transition-all rounded-sm')}
            style={{
              width: isWider || (index === 2 && isActive) ? '4rem' : '1.5rem',
              backgroundColor: isActive ? primaryColor : `${primaryColor}66`, // ~40% opacity
            }}
          />
        )
      })}
    </div>
  )
}
