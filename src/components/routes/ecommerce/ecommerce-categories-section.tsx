'use client'

import { Separator } from '@/components/ui/separator'
import { useProductsService } from '@/services/ecommerce-service/products-service'
import { cn } from '@/utils/class-name'
import previewData from '../../../../public/ecommerce-preview-data.json'
import { CategoriesProduct } from './ecommerce-categories-product'

export function CategoriesSection() {
  const { listProducts } = useProductsService()

  // const { data: productsData } = useQuery({
  //   queryKey: [EcommerceProductsQueryKey.LIST_PRODUCTS],
  //   queryFn: async () => await listProducts(),
  //   enabled: !isPreview,
  // })

  const productsList = previewData.products.items

  return (
    <div className="flex justify-center bg-slate-200 py-40">
      <div className="flex w-full max-w-[1200px] flex-col items-center px-4">
        <h2 className="mb-6 text-4xl font-semibold">
          Navegue pelas categorias
        </h2>
        <div className="flex gap-4">
          {productsList.map((_, index, array) => (
            <button className="flex items-center" key={index}>
              <div
                className={cn(
                  'px-3 py-2',
                  index === 0 ? 'bg-primary/30 text-primary' : 'text-gray-700',
                )}
              >
                Categoria {index}
              </div>
              {index !== array.length - 1 && (
                <Separator
                  className="ml-4 h-4 w-[1.5px] bg-primary opacity-70"
                  orientation="vertical"
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-14 grid w-full grid-cols-4">
          {productsList.map((item, index) => (
            <CategoriesProduct {...item} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
