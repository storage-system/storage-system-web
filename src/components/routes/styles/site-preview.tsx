import { useEcommerceManagement } from '@/providers/ecommerce-management-provider'
import { BenefitsSection } from '../ecommerce-management/ecommerce-benefits-section'
import { CategoriesSection } from '../ecommerce-management/ecommerce-categories-section'
import { Header } from '../ecommerce-management/ecommerce-header'
import { Hero } from '../ecommerce-management/ecommerce-hero'

export function SitePreview() {
  const { previewRef } = useEcommerceManagement()
  return (
    <div
      className="flex min-h-screen scale-[80%] flex-col bg-white"
      ref={previewRef}
    >
      <Header />
      <main className="grow">
        <Hero />
        <BenefitsSection />
        <CategoriesSection />
        {/* <NewProductsSection /> */}
        {/* <CustomersSection /> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}
