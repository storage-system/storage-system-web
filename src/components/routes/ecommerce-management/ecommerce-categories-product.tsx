import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'
import { cn } from '@/utils/class-name'
import { ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

export function CategoriesProduct({
  image,
  name,
  price,
  id,
  index,
}: any & {
  index: number
}) {
  const { colors } = useEcommerceManagement()

  const getColor = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex

  const primaryColor = getColor(ColorIdEnum.PRIMARY_COLOR)
  const textColor = getColor(ColorIdEnum.TEXT_COLOR)
  const backgroundColor = getColor(ColorIdEnum.BACKGROUND_COLOR)
  const mutedColor = getColor(ColorIdEnum.SECONDARY_COLOR)
  const borderColor = getColor(ColorIdEnum.SECONDARY_COLOR)

  return (
    <Link
      href={`ecommerce/${id}`}
      className={cn(
        'group flex h-96 flex-col border p-1 transition-colors',
        index >= 4 && 'border-t-0',
        index % 4 !== 3 && 'border-r-0',
      )}
      style={{
        backgroundColor: backgroundColor || undefined,
        borderColor: borderColor || undefined,
      }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={image}
          className="size-full object-cover transition-all group-hover:scale-105"
          style={{
            backgroundColor: mutedColor || '#f3f4f6',
          }}
        />
      </div>

      <div className="flex basis-[120px] items-center justify-between px-4 py-3 transition-colors">
        <div>
          <p
            className="text-base font-medium"
            style={{ color: textColor || undefined }}
          >
            {name}
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: primaryColor || undefined }}
          >
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4"
                style={{ color: '#facc15', fill: '#facc15' }}
              />
            ))}
          </div>
        </div>

        <div
          className="rounded-full p-3 transition-colors"
          style={{
            backgroundColor: index === 0 ? primaryColor + '33' : borderColor,
            color: index === 0 ? primaryColor : undefined,
          }}
        >
          <ShoppingBag />
        </div>
      </div>
    </Link>
  )
}
