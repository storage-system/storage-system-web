import { BenefitsSection } from '@/components/routes/ecommerce/ecommerce-benefits-section'
import { CategoriesSection } from '@/components/routes/ecommerce/ecommerce-categories-section'
import { CustomersSection } from '@/components/routes/ecommerce/ecommerce-customers-section'
import { Footer } from '@/components/routes/ecommerce/ecommerce-footer'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { Hero } from '@/components/routes/ecommerce/ecommerce-hero'
import { NewProductsSection } from '@/components/routes/ecommerce/ecommerce-new-products-section'

export default function Page() {
  return (
    <>
      <Header />
      <div className="mt-[170px]">
        <Hero />
        <BenefitsSection />
        <CategoriesSection />
        <NewProductsSection />
        <CustomersSection />
        <Footer />
      </div>
    </>
  )
}
