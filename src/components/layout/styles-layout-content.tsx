'use client'

import { type ReactNode } from 'react'

import { Content } from './content/styles-content'
import { Header } from './styles-header/header'
import { Sidebar } from './styles-sidebar/sidebar'
import ThemeContext from '@/providers/theme'
import { TooltipProvider } from '../ui/tooltip'
import { StylesProvider } from '@/providers/style-provider'
import { initialColorConfig } from '@/constants/styles/initial-color-config'

type LayoutContentProps = {
  children: ReactNode
}

export function StylesLayoutContent({ children }: LayoutContentProps) {
  return (
    <StylesProvider initialColorConfig={initialColorConfig}>
      <ThemeContext>
        <div className="flex min-h-screen w-full px-2 pb-5 pt-24 md:px-8">
          <TooltipProvider delayDuration={0}>
            <Header />
            <Sidebar />
            <Content>{children}</Content>
          </TooltipProvider>
        </div>
      </ThemeContext>
    </StylesProvider>
  )
}
