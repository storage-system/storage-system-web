import { Footer } from '@/components/routes/ecommerce/ecommerce-footer'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { PropsWithChildren } from 'react'

export default function EcommerceLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  )
}
