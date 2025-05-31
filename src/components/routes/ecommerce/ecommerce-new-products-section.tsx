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
import type { EcommerceProductDTO } from '@/@types/ecommerce/ecommerce-categories'
import { useEcommerce } from '@/providers/ecommerce-provider'

type Props = {
  products: EcommerceProductDTO[]
}

export function NewProductsSection({ products }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const { activeStyle } = useEcommerce()

  const primaryColor = activeStyle?.primaryColor ?? '#3b82f6'

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  return (
    <div className="flex flex-col items-center">
      <div className="my-24 w-full max-w-[1200px] space-y-12">
        <div>
          <h2
            className="text-4xl font-bold"
            style={{ color: activeStyle?.textColor }}
          >
            Novos Produtos
          </h2>
          <CustomPagination
            currentIndex={current}
            total={products.length}
            primaryColor={primaryColor}
          />
        </div>
        <Carousel
          setApi={setApi}
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {products.map((item, index) => (
              <CarouselItem key={item.id} className="basis-1/5">
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
              backgroundColor: isActive ? primaryColor : `${primaryColor}66`,
            }}
          />
        )
      })}
    </div>
  )
}
