import { ListProduct } from '@/@types/product'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { PrivateRoutes } from '@/constants/routes/private-routes'

interface Props {
  row: ListProduct
}

export function ProductDetailCell({ row }: Props) {
  return (
    <Link href={`${PrivateRoutes.PRODUCT}/${row.id}`}>
      <TooltipRoot>
        <TooltipTrigger>
          <Eye className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Ver detalhes</TooltipContent>
      </TooltipRoot>
    </Link>
  )
}
