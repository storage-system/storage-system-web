'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/class-name'
import { CategoriesProduct } from './ecommerce-categories-product'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { CategoryWithProducts } from '@/actions/home-actions'

type Props = {
  data: CategoryWithProducts[]
}

export function CategoriesSection({ data }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    data[0]?.category.id ?? '',
  )

  return (
    <div className="flex justify-center bg-slate-200 py-40">
      <div className="flex w-full max-w-[1200px] flex-col items-center px-4">
        <h2 className="mb-6 text-4xl font-semibold">
          Navegue pelas categorias
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="inline-flex w-full justify-center">
              {data.map(({ category }, index, array) => (
                <div key={category.id} className="flex items-center gap-4">
                  <TabsTrigger
                    className="cursor-pointer px-2 data-[state=active]:bg-primary/30 data-[state=active]:text-primary"
                    asChild
                    value={category.id}
                  >
                    <div className={cn('py-2 text-primary text-center')}>
                      {category.name}
                    </div>
                  </TabsTrigger>
                  {index !== array.length - 1 && (
                    <Separator
                      className="mr-4 h-4 w-[1.5px] bg-primary opacity-70"
                      orientation="vertical"
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
