import { Footer } from '@/components/routes/ecommerce/ecommerce-footer'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { PropsWithChildren } from 'react'

export default function EcommerceLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen grid-rows-4 flex-col">
      <Header />
      <div className="h-full">{children}</div>
      <Footer />
    </div>
  )
}
