import { Input } from '@/components/ui/input'
import { ModeToggle } from './mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { fallback } from '@/utils/fallback'
import { CommandMenu } from './command/command-menu'
import { sidebarConfig } from '../util/sidebar-config'

export function HeaderContent() {
  const { data: session } = useSession()

  const userPhoto = session?.user?.image
  const username = session?.user?.name

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex space-x-4 bg-accent items-center justify-center rounded-full shadow-default pl-4 pr-6 py-2">
      <CommandMenu
        sideBarConfig={{
          ...sidebarConfig,
          commandNav: sidebarConfig.sidebarNav,
        }}
        placehoder="Pesquise"
        innerPlaceholder="Procure páginas, atalhos ou temas..."
      />
      <ModeToggle />
      <Button size="icon" variant="link" onClick={handleSignOut}>
        <LogOut className="h-5 w-5" />
      </Button>
      <Avatar className="w-7 h-7">
        {userPhoto ? (
          <AvatarImage src={userPhoto} />
        ) : (
          username && <AvatarFallback>{fallback(username)}</AvatarFallback>
        )}
      </Avatar>
    </div>
  )
}
