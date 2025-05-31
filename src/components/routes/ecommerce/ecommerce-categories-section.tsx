'use client'

import { Separator } from '@/components/ui/separator'
import { CategoriesProduct } from './ecommerce-categories-product'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { CategoryWithProducts } from '@/actions/home-actions'
import { useEcommerce } from '@/providers/ecommerce-provider'
import { cn } from '@/utils/class-name'

type Props = {
  data: CategoryWithProducts[]
}

export function CategoriesSection({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    data[0]?.category.id ?? '',
  )

  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const textColor = activeStyle?.textColor || '#1f2937'
  const primaryColor = activeStyle?.primaryColor || '#3b82f6'

  return (
    <div className="flex justify-center py-40" style={{ backgroundColor }}>
      <div className="flex w-full max-w-[1200px] flex-col items-center px-4">
        <h2
          className="mb-6 text-4xl font-semibold"
          style={{ color: textColor }}
        >
          Navegue pelas categorias
        </h2>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="inline-flex w-full flex-wrap justify-center gap-2">
            {data.map(({ category }, index, array) => (
              <div key={category.id} className="flex items-center gap-4">
                <TabsTrigger asChild value={category.id}>
                  <button
                    type="button"
                    className={cn(
                      'px-3 py-2 rounded-md transition-colors duration-200',
                    )}
                    style={{
                      backgroundColor:
                        activeCategory === category.id
                          ? `${primaryColor}30`
                          : undefined,
                      color:
                        activeCategory === category.id
                          ? primaryColor
                          : textColor,
                    }}
                  >
                    {category.name}
                  </button>
                </TabsTrigger>

                {index !== array.length - 1 && (
                  <Separator
                    className="ml-4 h-4 w-[1.5px]"
                    orientation="vertical"
                    style={{ backgroundColor: primaryColor, opacity: 0.7 }}
                  />
                )}
              </div>
            ))}
          </TabsList>

          {data.map(({ category, products }) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mt-14 grid w-full grid-cols-4">
                {products.map((item, index) => (
                  <CategoriesProduct key={item.id} index={index} {...item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
