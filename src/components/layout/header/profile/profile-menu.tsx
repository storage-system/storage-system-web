import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { fallback } from '@/utils/fallback'
import { useSession } from 'next-auth/react'

export function ProfileMenu() {
  const { data: session } = useSession()

  const userPhoto = session?.user?.image
  const username = session?.user?.name

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-full">
          <Avatar className="size-7">
            {userPhoto ? (
              <AvatarImage src={userPhoto} />
            ) : (
              username && <AvatarFallback>{fallback(username)}</AvatarFallback>
            )}
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <p>{username}</p>
        <Separator className="bg-slate-300 dark:bg-slate-700" />
        <div>
          {
            // Profile content TODO:
          }
        </div>
      </PopoverContent>
    </Popover>
  )
}
