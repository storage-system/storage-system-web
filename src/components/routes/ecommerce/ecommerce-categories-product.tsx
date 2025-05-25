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
  const { config } = useEcommerce()
  const style = config.styles.find((s) => s.isActive)

  return (
    <Link
      href={`/${slug}/${id}`}
      className={cn('flex h-96 flex-col p-1 group border')}
      style={{
        borderColor: style?.primaryColor ? style?.primaryColor + 33 : undefined,
        backgroundColor: style?.backgroundColor ?? undefined,
      }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={productImage}
          className="size-full bg-gray-200 transition-all group-hover:scale-105"
        />
      </div>
      <div
        className="flex basis-[120px] items-center justify-between px-4"
        style={{
          backgroundColor: style?.backgroundColor ?? undefined,
        }}
      >
        <div>
          <p className="text-lg" style={{ color: style?.textColor }}>
            {name}
          </p>
          <p className="text-lg font-bold" style={{ color: style?.textColor }}>
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4 fill-amber-600 text-amber-600"
              />
            ))}
          </div>
        </div>
        <div
          className="rounded-full p-3"
          style={{
            backgroundColor: style?.primaryColor + '33',
            color: index === 0 ? style?.primaryColor : undefined,
          }}
        >
          <ShoppingBag />
        </div>
      </div>
    </Link>
  )
}
