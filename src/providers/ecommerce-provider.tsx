'use client'

import { RetrieveEcommerceDTO } from '@/actions/product-actions'
import { createContext, useContext, useMemo, type ReactNode } from 'react'

export const EcommerceContext = createContext<{
  config: RetrieveEcommerceDTO
  activeStyle: RetrieveEcommerceDTO['styles'][number]
} | null>(null)

interface EcommerceProviderProps {
  initialConfig: RetrieveEcommerceDTO
  children: ReactNode
}

export function EcommerceProvider({
  children,
  initialConfig,
}: EcommerceProviderProps) {
  const activeStyle = useMemo(() => {
    return (
      initialConfig.styles.find((style) => style.isActive) ||
      initialConfig.styles[0]
    )
  }, [initialConfig.styles])

  return (
    <EcommerceContext.Provider value={{ config: initialConfig, activeStyle }}>
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
