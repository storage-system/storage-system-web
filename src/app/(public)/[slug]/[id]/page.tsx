import { getEcommerceProduct } from '@/actions/product-actions'
import { ProductContent } from '@/components/routes/ecommerce/product/product-content'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    slug: string
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  if (!params.id) return notFound()
  const product = await getEcommerceProduct(params.slug, params.id)

  if (!product) return notFound()

  return <ProductContent data={product} />
}
