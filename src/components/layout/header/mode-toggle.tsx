'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Moon, MoonIcon, Sun, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-9 px-0" size="icon" variant="ghost">
          <SunIcon className="h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="hover:bg-gray-100 transition ease-linear"
        >
          <Sun className="h-4 w-4 mr-2" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="hover:bg-gray-100 transition ease-linear"
        >
          <Moon className="h-4 w-4 mr-2" />
          Escuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
