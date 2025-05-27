'use client'

import { RetrieveEcommerceDTO } from '@/actions/product-actions'
import { createContext, useContext, type ReactNode } from 'react'

export const EcommerceContext = createContext<{
  config: RetrieveEcommerceDTO
} | null>(null)

interface EcommerceProviderProps {
  initialConfig: RetrieveEcommerceDTO
  children: ReactNode
}

export function EcommerceProvider({
  children,
  initialConfig,
}: EcommerceProviderProps) {
  return (
    <EcommerceContext.Provider value={{ config: initialConfig }}>
      {children}
    </EcommerceContext.Provider>
  )
}

export function useEcommerce() {
  const context = useContext(EcommerceContext)
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider.')
  }
  return context
}
