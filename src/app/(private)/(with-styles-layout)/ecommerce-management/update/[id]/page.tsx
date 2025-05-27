'use client'

import { SitePreview } from '@/components/routes/styles/site-preview'
import { useEcommerceManagement } from '@/providers/ecommerce-management-provider'

export default function StyleEdition() {
  const { previewRef } = useEcommerceManagement()

  return (
    <div ref={previewRef}>
      <SitePreview />
    </div>
  )
}
