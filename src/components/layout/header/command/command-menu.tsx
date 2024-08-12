'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { useState } from 'react'
import { SidebarConfig } from '../../util/sidebar-config'
import { usePathname, useRouter } from 'next/navigation'
import { CommandItem } from 'cmdk'
import { cn } from '@/utils/class-name'

interface CommandProps {
  placehoder: string
  innerPlaceholder: string
  sideBarConfig: SidebarConfig
}

export function CommandMenu({
  placehoder,
  innerPlaceholder,
  sideBarConfig,
}: CommandProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  function handleNavigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <div>
      <button
        className="flex justify-start items-center pl-4 h-9 w-[300px] bg-gray-100 dark:bg-black/20 border-none rounded-full"
        onClick={() => setOpen((state) => !state)}
      >
        {placehoder}
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={innerPlaceholder} />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          {sideBarConfig.commandNav.map((item, index) => (
            <CommandGroup key={index} heading={item.title}>
              {item?.items?.map(({ icon, href, title }, index) => (
                <CommandItem
                  key={index}
                  className={cn(
                    'flex items-center gap-2 my-1 text-md rounded-md transition-all hover:bg-background hover:text-foreground hover:cursor-pointer',
                    pathname === href &&
                      'border-l-4 border-primary bg-background brightness-90 hover:bg-input hover:brightness-100',
                  )}
                  onSelect={() => handleNavigate(href)}
                >
                  {icon}
                  {title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  )
}
