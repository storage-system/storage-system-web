'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useSidebar } from '@/hooks/layout/use-sidebar'
import { cn } from '@/utils/class-name'

import { type NavItem } from '../util/sidebar-config'
import { SidebarMenu } from './sidebar-menu'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StorageLogo } from '@/shared/storage-logo'

export interface DocsSidebarNavProps {
  items: NavItem[]
}

export function SidebarItem({ items }: DocsSidebarNavProps) {
  const { isCollapse, handleToggleCollapse } = useSidebar()

  return items.length ? (
    <aside
      className={cn(
        'group relative h-full w-full bg-accent p-0 px-2 transition-all ease-in-out dark:border-r-2 dark:border-accent',
        isCollapse ? 'max-w-[80px]' : 'max-w-[220px]',
      )}
    >
      <Button
        className="absolute -right-2 top-16 h-5 w-5 rounded-full opacity-0 transition-all ease-in-out group-hover:md:opacity-100"
        onClick={handleToggleCollapse}
        size="icon"
        variant="outline"
      >
        {isCollapse ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
      </Button>
      <div className="w-full flex flex-col items-center border-b border-[#F4F7FE] dark:border-white/10 py-10">
        {isCollapse ? (
          <StorageLogo />
        ) : (
          <h1 className="font-extrabold text-textPrimary dark:text-white text-3xl">
            STOR<span className="font-normal">AGE</span>
          </h1>
        )}
      </div>
      <ScrollArea className="h-screen max-h-[20rem] w-full md:max-h-[26rem] 2xl:max-h-screen">
        {items.map((item, index) => (
          <div className="flex flex-col gap-2 px-2 pb-4" key={index}>
            {!isCollapse && (
              <h4 className="mb-1 rounded-md px-3 py-1 text-sm font-bold text-textPrimary">
                {item.title}
              </h4>
            )}
            {item?.items?.map((child, index) => (
              <SidebarMenu item={child} key={index} />
            ))}
          </div>
        ))}
      </ScrollArea>
    </aside>
  ) : null
}
