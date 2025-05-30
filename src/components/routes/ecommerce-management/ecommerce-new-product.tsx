import { cn } from '@/utils/class-name'
import { priceFormatter } from '@/utils/format-currency'
import { ShoppingBag, Star } from 'lucide-react'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

export function NewProduct({
  image,
  index,
  name,
  price,
}: any & { index: number }) {
  const { colors } = useEcommerceManagement()

  const getColorByType = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)

  return (
    <div
      className={cn('flex h-80 w-60 flex-col border rounded-md group')}
      style={{ backgroundColor }}
    >
      <div className="w-full flex-1 overflow-hidden">
        <img
          alt={name}
          src={image}
          className="size-full bg-muted object-cover transition-all group-hover:scale-105"
        />
      </div>
      <div
        className="flex basis-[120px] items-center justify-between px-4"
        style={{ backgroundColor: secondaryColor }}
      >
        <div>
          <p className="text-lg" style={{ color: textColor }}>
            {name}
          </p>
          <p className="text-lg font-bold" style={{ color: primaryColor }}>
            {priceFormatter.format(price)}
          </p>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4"
                style={{ fill: primaryColor, color: primaryColor }}
              />
            ))}
          </div>
        </div>
        <div
          className={cn('rounded-full p-3')}
          style={{
            backgroundColor:
              index === 0
                ? `${primaryColor}33`
                : getColorByType(ColorIdEnum.BACKGROUND_COLOR),
            color: primaryColor,
          }}
        >
          <ShoppingBag />
        </div>
      </div>
    </div>
  )
}
