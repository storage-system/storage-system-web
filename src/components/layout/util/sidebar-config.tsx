import { type ReactNode } from 'react'
import {
  Activity,
  BriefcaseBusiness,
  HomeIcon,
  List,
  Palette,
  Settings2,
  ShoppingCart,
} from 'lucide-react'

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
  items?: Shortcuts[]
}

export interface SidebarConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
  shortcuts: Shortcuts[]
  commandNav: NavItem[]
}

export const sidebarConfig: SidebarConfig = {
  mainNav: [],
  shortcuts: [
    {
      href: '',
      title: 'Atalhos',
      items: [
        {
          title: 'Atalho 1',
          href: PrivateRoutes.CATEGORY,
          items: [],
          partialKey: 'ctrl',
          completeKey: 'a',
        },
        {
          title: 'Atalho 2',
          href: PrivateRoutes.COMPANY,
          items: [],
          partialKey: 'ctrl',
          completeKey: 'b',
        },
      ],
    },
  ],
  sidebarNav: [
    {
      href: '',
      items: [
        {
          title: 'Início',
          href: PrivateRoutes.HOME,
          items: [],
          icon: <HomeIcon className="size-4" />,
        },
      ],
    },
    {
      href: '',
      title: 'Produtos',
      items: [
        {
          title: 'Produtos',
          href: PrivateRoutes.PRODUCT,
          items: [],
          icon: <ShoppingCart className="size-4" />,
        },
        {
          title: 'Gerenciar estoque',
          href: PrivateRoutes.MANAGE_STOCK,
          items: [],
          icon: <Activity className="size-4" />,
        },
      ],
    },
    {
      href: '',
      title: 'Administrativo',
      items: [
        {
          title: 'Categorias',
          href: PrivateRoutes.CATEGORY,
          items: [],
          icon: <List className="size-4" />,
        },
        {
          title: 'Empresa',
          href: PrivateRoutes.COMPANY,
          items: [],
          icon: <BriefcaseBusiness className="size-4" />,
        },
        {
          title: 'Configurações',
          href: PrivateRoutes.CONFIGURATIONS,
          items: [],
          icon: <Settings2 className="size-4" />,
        },
        {
          title: 'Estilos',
          href: PrivateRoutes.STYLES,
          items: [],
          icon: <Palette className="size-4" />,
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
