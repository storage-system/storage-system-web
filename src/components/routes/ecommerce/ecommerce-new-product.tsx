'use client'

import { EcommerceProductDTO } from '@/@types/ecommerce/ecommerce-categories'
import { cn } from '@/utils/class-name'
import { priceFormatter } from '@/utils/format-currency'
import { ShoppingBag, Star } from 'lucide-react'
import { useEcommerce } from '@/providers/ecommerce-provider'

export function NewProduct({
  productImage,
  index,
  name,
  price,
}: EcommerceProductDTO & { index: number }) {
  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const textColor = activeStyle?.textColor || '#1f2937'
  const primaryColor = activeStyle?.primaryColor || '#3b82f6'

  return (
    <div
      className={cn(
        'flex h-80 w-60 flex-col border bg-background rounded-md group',
      )}
      style={{ backgroundColor }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={productImage}
          className="size-full transition-all group-hover:scale-105"
          style={{ backgroundColor: '#e5e7eb', objectFit: 'cover' }}
        />
      </div>
      <div
        className="flex basis-[120px] items-center justify-between bg-background px-4 pb-4"
        style={{ backgroundColor }}
      >
        <div>
          <p className="text-lg truncate w-[150px]" style={{ color: textColor }}>
            {name}
          </p>
          <div>
            <p className="text-lg font-bold" style={{ color: textColor }}>
              {priceFormatter.format(price)}
            </p>
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4"
                style={{ fill: primaryColor, color: primaryColor }}
              />
            ))}
          </div>
        </div>
        <div
          className={cn('rounded-full p-3')}
          style={{
            backgroundColor: index === 0 ? `${primaryColor}33` : '#d1d5db',
            color: index === 0 ? primaryColor : undefined,
          }}
        >
          <ShoppingBag />
        </div>
      </div>
    </div>
  )
}
