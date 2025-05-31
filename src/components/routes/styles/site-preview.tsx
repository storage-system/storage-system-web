import {
  ColorIdEnum,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'
import { BenefitsSection } from '../ecommerce-management/ecommerce-benefits-section'
import { CategoriesSection } from '../ecommerce-management/ecommerce-categories-section'
import { Header } from '../ecommerce-management/ecommerce-header'
import { Hero } from '../ecommerce-management/ecommerce-hero'
import { NewProductsSection } from '../ecommerce-management/ecommerce-new-products-section'
import { CustomersSection } from '../ecommerce-management/ecommerce-customers-section'
import { Footer } from '../ecommerce-management/ecommerce-footer'

export function SitePreview() {
  const { previewRef, colors } = useEcommerceManagement()

  const getColorByType = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)

  return (
    <div
      className="flex min-h-screen scale-[80%] flex-col "
      style={{
        backgroundColor: backgroundColor || '#ffffff',
        backgroundImage: primaryColor
          ? `linear-gradient(0deg, ${primaryColor}15 0%, transparent 100%)`
          : undefined,
      }}
      ref={previewRef}
    >
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
