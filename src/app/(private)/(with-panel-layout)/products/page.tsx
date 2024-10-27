import { TableProducts } from '@/components/routes/products/list/table-products'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Products() {
  return (
    <div className="flex flex-col items-end space-y-4">
      <Link
        href={PrivateRoutes.PRODUCT + PrivateRoutes.CREATE_PRODUCT}
        className={buttonVariants({ variant: 'default' })}
      >
        <PlusCircle className="mr-2 size-4" />
        Criar Produto
      </Link>
      <Card className="w-full">
        <TableProducts />
      </Card>
    </div>
  )
}
