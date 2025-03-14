import { TableProducts } from '@/components/routes/products/list/table-products'
import { GetProdutSpreadsheet } from '@/components/routes/products/spreadsheet/get-product-spreadsheet'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default async function Products() {
  return (
    <div className="flex flex-col items-end space-y-4">
      <div className="space-x-4">
        <GetProdutSpreadsheet />
        <Link
          href={PrivateRoutes.PRODUCT + PrivateRoutes.CREATE_PRODUCT}
          className={buttonVariants({ variant: 'default' })}
        >
          <PlusCircle className="mr-2 size-4" />
          Criar Produto
        </Link>
      </div>
      <Card className="w-full">
        <TableProducts />
      </Card>
    </div>
  )
}
