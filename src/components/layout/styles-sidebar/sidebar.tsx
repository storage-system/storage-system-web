'use client'

import { DrawerContent, Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Menu } from 'lucide-react'

import { type NavItem } from '../util/sidebar-config'
import { SidebarContent } from './sidebar-content'

export interface DocsSidebarNavProps {
  items: NavItem[]
}

export function Sidebar() {
  return (
    <>
      <Drawer>
        <DrawerTrigger className="fixed left-0 top-1 z-50 mx-2 mt-5 flex items-start justify-start md:hidden">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="flex w-full items-center justify-center"></DrawerContent>
      </Drawer>
      <div className={'fixed left-0 top-16 z-10 h-screen w-[350px] bg-accent'}>
        <SidebarContent />
      </div>
    </>
  )
}
