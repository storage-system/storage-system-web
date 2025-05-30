'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/class-name'
import previewData from '../../../../public/ecommerce-preview-data.json'
import { CategoriesProduct } from './ecommerce-categories-product'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

export function CategoriesSection() {
  const productsList = previewData.products.items
  const categoriesList = previewData.categories

  const { colors } = useEcommerceManagement()

  const getColorByType = (colorType: ColorIdEnum) =>
    colors.find((color) => color.colorId === colorType)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)

  return (
    <div
      className="flex justify-center py-40"
      style={{ backgroundColor: backgroundColor || undefined }}
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center px-4">
        <h2
          className="mb-6 text-4xl font-semibold"
          style={{ color: textColor || undefined }}
        >
          Navegue pelas categorias
        </h2>
        <div className="flex">
          {categoriesList.map((_, index, array) => (
            <button type="button" className="flex items-center" key={index}>
              <div
                className={cn('px-3 py-2 rounded-md')}
                style={{
                  backgroundColor:
                    index === 0 ? `${primaryColor}30` : undefined,
                  color: index === 0 ? primaryColor : textColor,
                }}
              >
                Categoria {index}
              </div>
              {index !== array.length - 1 && (
                <Separator
                  className="ml-4 h-4 w-[1.5px]"
                  orientation="vertical"
                  style={{ backgroundColor: primaryColor, opacity: 0.7 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-14 grid w-full grid-cols-4 gap-4">
          {productsList.map((item, index) => (
            <CategoriesProduct {...item} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
