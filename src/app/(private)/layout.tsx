import { type ReactNode } from 'react'

import { LayoutContent } from '@/components/layout/layout-content'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutContent>
      {children}
    </LayoutContent>
  )
}
