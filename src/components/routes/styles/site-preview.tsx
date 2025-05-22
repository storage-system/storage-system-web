import { useStyles } from '@/providers/style-provider'
import { cn } from '@/utils/class-name'
import { Header } from '../ecommerce/ecommerce-header'
import { Hero } from '../ecommerce/ecommerce-hero'
import { BenefitsSection } from '../ecommerce/ecommerce-benefits-section'
import { CategoriesSection } from '../ecommerce/ecommerce-categories-section'
import { NewProductsSection } from '../ecommerce/ecommerce-new-products-section'
import { CustomersSection } from '../ecommerce/ecommerce-customers-section'
import { Footer } from '../ecommerce/ecommerce-footer'

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
