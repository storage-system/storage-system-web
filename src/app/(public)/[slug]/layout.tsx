import { getEcommerceDetails } from '@/actions/product-actions'
import { Footer } from '@/components/routes/ecommerce/ecommerce-footer'
import { Header } from '@/components/routes/ecommerce/ecommerce-header'
import { EcommerceProvider } from '@/providers/ecommerce-provider'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {
  params: { slug: string }
}

export default async function EcommerceLayout({
  children,
  params,
}: LayoutProps) {
  if (!params.slug) {
    return notFound()
  }
  const config = await getEcommerceDetails(params.slug).catch(() => {
    return null
  })

  if (!config) {
    return notFound()
  }

  return (
    <EcommerceProvider initialConfig={config}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </EcommerceProvider>
  )
}
