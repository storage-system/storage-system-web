'use client'
import { StylesLayoutContent } from '@/components/layout/styles-layout-content'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <StylesLayoutContent>{children}</StylesLayoutContent>
}
