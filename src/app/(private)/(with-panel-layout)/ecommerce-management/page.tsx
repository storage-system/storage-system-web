import { ListStyles } from '@/components/routes/styles/list/list-styles'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function EcommerceManagement() {
  return (
    <div className="flex flex-col items-end space-y-4">
      <Link
        href={PrivateRoutes.ECOMMERCE_MANAGEMENT_CREATE}
        className={buttonVariants({ variant: 'default' })}
      >
        <PlusCircle className="mr-2 size-4" />
        Criar Estilo
      </Link>
      <Card className="w-full">
        <ListStyles />
      </Card>
    </div>
  )
}
