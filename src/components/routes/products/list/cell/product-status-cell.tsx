import { StatusProduct } from '@/@types/status-product'
import { CircleCheck, CircleX, TrendingDown } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  status: StatusProduct
}

const statusTextMap: Record<StatusProduct, string> = {
  [StatusProduct.ACTIVE]: 'Ativo',
  [StatusProduct.INACTIVE]: 'Inativo',
  [StatusProduct.OUT_OF_STOCK]: 'Fora do estoque',
}

const statusIconMap: Record<StatusProduct, ReactNode> = {
  [StatusProduct.ACTIVE]: <CircleCheck className="size-4" />,
  [StatusProduct.INACTIVE]: <CircleX className="size-4" />,
  [StatusProduct.OUT_OF_STOCK]: <TrendingDown className="size-4" />,
}

export function ProductStatusCell({ status }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      {statusIconMap[status]}
      {statusTextMap[status]}
    </div>
  )
}
