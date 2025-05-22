import { cn } from '@/utils/class-name'
import { BenefitsSection } from '../ecommerce/ecommerce-benefits-section'
import { Footer } from '../ecommerce/ecommerce-footer'
import { Header } from '../ecommerce/ecommerce-header'
import { Hero } from '../ecommerce/ecommerce-hero'

export function SitePreview() {
  return (
    <div className={cn('flex flex-col', 'min-h-screen')}>
      <Header />
      <main className="grow">
        <Hero />
        <BenefitsSection />
        {/* <CategoriesSection /> */}
        {/* <NewProductsSection /> */}
        {/* <CustomersSection /> */}
      </main>
      <Footer />
    </div>
  )
}
