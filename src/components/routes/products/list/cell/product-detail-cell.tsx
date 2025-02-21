import { ListProduct } from '@/@types/product'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Eye } from 'lucide-react'
import { ProductDetailContent } from '../../detail/product-detail-content'
import { useState } from 'react'

interface Props {
  row: ListProduct
}

export function ProductDetailCell({ row }: Props) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true)

  return (
    <Drawer direction="right" open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger>
        <TooltipRoot>
          <TooltipTrigger>
            <Eye className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Ver detalhes</TooltipContent>
        </TooltipRoot>
      </DrawerTrigger>
      <DrawerContent className="w-2/5 p-4">
        <ProductDetailContent id={row.id} setOpenDrawer={setOpenDrawer} />
      </DrawerContent>
    </Drawer>
  )
}
