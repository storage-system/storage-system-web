import { Hero } from '@/components/routes/ecommerce/ecommerce-hero'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { NavBar } from '@/components/routes/ecommerce/ecommerce-navbar'
import { BenefitsSection } from '@/components/routes/ecommerce/ecommerce-benefits-section'

export default function Page() {
  return (
    <>
      <Header />
      <NavBar />
      <Hero />
      <BenefitsSection />
    </>
  )
}
