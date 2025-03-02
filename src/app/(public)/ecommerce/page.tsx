import { Hero } from '@/components/routes/ecommerce/ecommerce-hero'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { NavBar } from '@/components/routes/ecommerce/ecommerce-navbar'
import { BenefitsSection } from '@/components/routes/ecommerce/ecommerce-benefits-section'
import { CategoriesSection } from '@/components/routes/ecommerce/ecommerce-categories-section'
import { NewProductsSection } from '@/components/routes/ecommerce/ecommerce-new-products-section'
import { CustomersSection } from '@/components/routes/ecommerce/ecommerce-customers-section'
import { Footer } from '@/components/routes/ecommerce/ecommerce-footer'

export default function Page() {
  return (
    <>
      <Header />
      <NavBar />
      <Hero />
      <BenefitsSection />
      <CategoriesSection />
      <NewProductsSection />
      <CustomersSection />
      <Footer />
    </>
  )
}
