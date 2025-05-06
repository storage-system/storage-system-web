import { EachProduct } from '@/@types/ecommerce/product'
import { cn } from '@/utils/class-name'
import { ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

export function CategoriesProduct({
  image,
  name,
  price,
  id,
  index,
}: EachProduct & { index: number }) {
  return (
    <Link
      href={`ecommerce/${id}`}
      className={cn(
        'flex h-96 flex-col border border-primary/30 bg-background p-1 group',
        index >= 4 && 'border-t-0',
        index % 4 !== 3 && 'border-r-0',
      )}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={image}
          className="size-full bg-gray-200 transition-all group-hover:scale-105"
        />
      </div>
      <div className="flex basis-[120px] items-center justify-between bg-background px-4">
        <div>
          <p className="text-lg text-gray-600">{name}</p>
          <div>
            <p className="text-lg font-bold text-gray-600">
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
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
          className={cn(
            'rounded-full p-3',
            index === 0 ? 'bg-primary/20 text-primary' : 'bg-gray-300',
          )}
        >
          <ShoppingBag />
        </div>
      </div>
    </Link>
  )
}
