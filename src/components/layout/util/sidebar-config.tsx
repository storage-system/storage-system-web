import { type ReactNode } from 'react'
import { BriefcaseBusiness, HomeIcon, List } from 'lucide-react'

import { PrivateRoutes } from '@/constants/routes/private-routes'

export interface NavItem {
  title?: string
  href: string
  disabled?: boolean
  external?: boolean
  items?: NavItem[]
  icon?: ReactNode
}

export interface Shortcuts extends NavItem {
  partialKey?: string
  completeKey?: string
}

interface SidebarConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
  shortcuts: Shortcuts[]
  commandNav: NavItem[]
}

export const sidebarConfig: SidebarConfig = {
  mainNav: [],
  shortcuts: [],
  sidebarNav: [
    {
      href: '',
      items: [
        {
          title: 'Início',
          href: PrivateRoutes.HOME,
          items: [],
          icon: <HomeIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      href: '',
      title: 'Configurações',
      items: [
        {
          title: 'Categorias',
          href: PrivateRoutes.CATEGORY,
          items: [],
          icon: <List className="h-4 w-4" />,
        },
        {
          title: 'Empresa',
          href: PrivateRoutes.COMPANY,
          items: [],
          icon: <BriefcaseBusiness className="h-4 w-4" />,
        },
      ],
    },
  ],
  commandNav: [
    {
      title: 'Início',
      href: PrivateRoutes.HOME,
    },
  ],
}
