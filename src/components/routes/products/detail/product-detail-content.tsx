import { X } from 'lucide-react'
import { DrawerTitle } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { useProductsService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { ProductGeneralInfo } from './components/product-general-info'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductDetailsTab } from '@/@types/product/produt-details-tab'
import { ProductDetailPricing } from './components/product-detail-pricing'
import { ProductDetailGeneralData } from './components/product-detail-general-data'
import { ProductDetailAdditionalInfo } from './components/product-detail-additional-info'

interface Props {
  id: string
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
}

export function ProductDetailContent({ id, setOpenDrawer }: Props) {
  const { getProductByIdService } = useProductsService()

  const { data: product } = useQuery({
    queryKey: [productsQueryKey.GET_PRODUCT_BY_ID],
    queryFn: () => getProductByIdService(id),
    enabled: !!id,
  })

  function closeDrawer() {
    setOpenDrawer(false)
  }

  if (!product) return null

  const productTabs = [
    {
      value: ProductDetailsTab.PRICING,
      label: 'Precificação',
      component: <ProductDetailPricing product={product} />,
    },
    {
      value: ProductDetailsTab.GENERAL_DATA,
      label: 'Dados Gerais',
      component: <ProductDetailGeneralData />,
    },
    {
      value: ProductDetailsTab.ADDITIONAL_INFORMATION,
      label: 'Informações Adicionais',
      component: <ProductDetailAdditionalInfo />,
    },
  ]

  return (
    <div>
      <div className="mx-4">
        <div className="flex items-center justify-between">
          <DrawerTitle className="mt-2">Informações do produto</DrawerTitle>
          <X className="size-8 cursor-pointer" onClick={closeDrawer} />
        </div>
        <Separator className="my-4" />
      </div>
      <ProductGeneralInfo product={product} />
      <Tabs defaultValue={ProductDetailsTab.PRICING} className="mt-4">
        <TabsList className="grid w-full grid-cols-4">
          {productTabs.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className="w-full">
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {productTabs.map(({ value, component }) => (
          <TabsContent key={value} value={value}>
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
