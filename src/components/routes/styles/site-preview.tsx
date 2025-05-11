import { useStyles } from '@/providers/style-provider'
import { BenefitsSection } from '../ecommerce/ecommerce-benefits-section'
import { CategoriesSection } from '../ecommerce/ecommerce-categories-section'
import { CustomersSection } from '../ecommerce/ecommerce-customers-section'
import { Footer } from '../ecommerce/ecommerce-footer'
import { Header } from '../ecommerce/ecommerce-header'
import { Hero } from '../ecommerce/ecommerce-hero'
import { NewProductsSection } from '../ecommerce/ecommerce-new-products-section'
import { cn } from '@/utils/class-name'

export function SitePreview() {
  const { isPreview } = useStyles()
  return (
    <div className={cn('flex flex-col', !isPreview && 'min-h-screen')}>
      <Header />
      <main className="grow">
        <Hero />
        <BenefitsSection />
        <CategoriesSection />
        <NewProductsSection />
        <CustomersSection />
      </main>
      <Footer />
    </div>
  )
}
