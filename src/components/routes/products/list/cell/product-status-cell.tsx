import { StatusProduct } from '@/@types/status-product'
import { cn } from '@/utils/class-name'
import { CircleCheck, CircleX, TrendingDown } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
  status: StatusProduct
  className?: string
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

export function ProductStatusCell({ status, className }: Props) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {statusIconMap[status]}
      {statusTextMap[status]}
    </div>
  )
}
