import { ListStyle } from '@/@types/style'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { PrivateRoutes } from '@/constants/routes/private-routes'

interface Props {
  row: ListStyle
}

export function StyleDetailCell({ row }: Props) {
  return (
    <Link href={`${PrivateRoutes.STYLES}/${row.id}`}>
      <TooltipRoot>
        <TooltipTrigger>
          <Eye className="size-4" />
        </TooltipTrigger>
        <TooltipContent>Ver detalhes</TooltipContent>
      </TooltipRoot>
    </Link>
  )
}
