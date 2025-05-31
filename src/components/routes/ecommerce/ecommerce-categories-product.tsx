'use client'

import { EcommerceProductDTO } from '@/@types/ecommerce/ecommerce-categories'
import { cn } from '@/utils/class-name'
import { ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEcommerce } from '@/providers/ecommerce-provider'

export function CategoriesProduct({
  name,
  id,
  index,
  price,
  productImage,
}: EcommerceProductDTO & {
  index: number
}) {
  const { slug }: { slug: string } = useParams()
  const { activeStyle } = useEcommerce()

  const primaryColor = activeStyle?.primaryColor || '#3b82f6'
  const textColor = activeStyle?.textColor || '#1f2937'
  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const secondaryColor = activeStyle?.secondaryColor || '#e5e7eb'

  return (
    <Link
      href={`/${slug}/${id}`}
      className={cn(
        'group flex h-96 flex-col border p-1 transition-colors',
        index >= 4 && 'border-t-0',
        index % 4 !== 3 && 'border-r-0',
      )}
      style={{
        backgroundColor,
        borderColor: secondaryColor,
      }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={productImage}
          className="size-full object-cover transition-all group-hover:scale-105"
          style={{
            backgroundColor: secondaryColor,
          }}
        />
      </div>

      <div className="flex basis-[120px] items-center justify-between px-4 py-3 transition-colors">
        <div>
          <p className="text-base font-medium" style={{ color: textColor }}>
            {name}
          </p>
          <p className="text-lg font-bold" style={{ color: primaryColor }}>
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4"
                style={{ color: '#facc15', fill: '#facc15' }}
              />
            ))}
          </div>
        </div>

        <div
          className="rounded-full p-3 transition-colors"
          style={{
            backgroundColor: index === 0 ? primaryColor + '33' : secondaryColor,
            color: index === 0 ? primaryColor : undefined,
          }}
        >
          <ShoppingBag />
        </div>
      </div>
    </Link>
  )
}
