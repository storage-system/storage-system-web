'use client'

import { Separator } from '@/components/ui/separator'

import { CategoriesProduct } from './ecommerce-categories-product'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { CategoryWithProducts } from '@/actions/home-actions'
import { useEcommerce } from '@/providers/ecommerce-provider'

type Props = {
  data: CategoryWithProducts[]
}

export function CategoriesSection({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    data[0]?.category.id ?? '',
  )

  const { config } = useEcommerce()
  const style = config.styles.find((s) => s.isActive)

  return (
    <div
      className="flex justify-center py-40"
      style={{ backgroundColor: style?.backgroundColor }}
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center px-4">
        <h2
          className="mb-6 text-4xl font-semibold"
          style={{ color: style?.textColor }}
        >
          Navegue pelas categorias
        </h2>

        <div className="flex items-center justify-center gap-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex w-full flex-wrap justify-center gap-2">
              {data.map(({ category }, index, array) => (
                <div key={category.id} className="flex items-center gap-4">
                  <TabsTrigger
                    className="cursor-pointer rounded px-2 data-[state=active]:bg-opacity-30 data-[state=active]:text-primary"
                    asChild
                    value={category.id}
                  >
                    <div
                      className="py-2 text-center"
                      style={{
                        color: style?.primaryColor,
                        backgroundColor:
                          activeCategory === category.id
                            ? style?.primaryColor + '33'
                            : undefined,
                      }}
                    >
                      {category.name}
                    </div>
                  </TabsTrigger>

                  {index !== array.length - 1 && (
                    <Separator
                      className="mr-4 h-4 w-[1.5px] opacity-70"
                      orientation="vertical"
                      style={{ backgroundColor: style?.primaryColor }}
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
    </div>
  )
}
