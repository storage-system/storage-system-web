import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { CommandMenu } from './command/command-menu'
import { sidebarConfig } from '../util/sidebar-config'
import { ProfileMenu } from './profile/profile-menu'

export function HeaderContent() {
  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex items-center justify-center space-x-4 rounded-full bg-accent py-2 pl-4 pr-6 shadow-default">
      <CommandMenu
        sideBarConfig={{
          ...sidebarConfig,
          commandNav: sidebarConfig.sidebarNav,
        }}
        placehoder="Pesquise..."
        innerPlaceholder="Procure páginas, atalhos ou temas..."
      />
      <ModeToggle />
      <Button size="icon" variant="link" onClick={handleSignOut}>
        <LogOut className="size-5" />
      </Button>
      <ProfileMenu />
    </div>
  )
}
