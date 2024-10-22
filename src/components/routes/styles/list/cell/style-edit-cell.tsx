import { ListStyle } from '@/@types/style'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { PrivateRoutes } from '@/constants/routes/private-routes'

interface Props {
  row: ListStyle
}

export function StyleEditCell({ row }: Props) {
  return (
    <Link
      href={`${PrivateRoutes.STYLES}/${row.id}/${PrivateRoutes.UPDATE_STYLES}`}
    >
      <TooltipRoot>
        <TooltipTrigger>
          <Edit className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Editar produto</TooltipContent>
      </TooltipRoot>
    </Link>
  )
}
