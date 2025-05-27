import { Hero } from '@/components/routes/ecommerce/ecommerce-hero'
import { BenefitsSection } from '@/components/routes/ecommerce/ecommerce-benefits-section'
import { CategoriesSection } from '@/components/routes/ecommerce/ecommerce-categories-section'
import { CustomersSection } from '@/components/routes/ecommerce/ecommerce-customers-section'
import { NewProductsSection } from '@/components/routes/ecommerce/ecommerce-new-products-section'
import {
  listAllEcommerceProducts,
  listEcommerceProductsGroupedByCategory,
} from '@/actions/home-actions'

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const slug = params.slug
  const groupedCategories = await listEcommerceProductsGroupedByCategory(slug)
  const { items: allProducts } = await listAllEcommerceProducts(slug)

  return (
    <>
      <Hero />
      <BenefitsSection />
      <CategoriesSection data={groupedCategories} />
      <NewProductsSection products={allProducts} />
      <CustomersSection />
    </>
  )
}
