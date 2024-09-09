import { ListProduct } from '@/@types/product'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { ProductRoutes } from '@/constants/routes/product-routes'

interface Props {
  row: ListProduct
}

export function ProductEditCell({ row }: Props) {
  return (
    <Link href={`${PrivateRoutes.PRODUCT}/${row.id}/${ProductRoutes.UPDATE}`}>
      <TooltipRoot>
        <TooltipTrigger>
          <Edit className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Editar produto</TooltipContent>
      </TooltipRoot>
    </Link>
  )
}
