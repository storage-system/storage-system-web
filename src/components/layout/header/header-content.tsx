import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { fallback } from "@/utils/fallback";

export function HeaderContent() {
  const { data: session } = useSession()

  const userPhoto = session?.user?.image
  const username = session?.user?.name

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex space-x-4 bg-accent items-center justify-center rounded-full shadow-default p-2">
      <Input
        className="h-9 bg-gray-100 dark:bg-black/20 border-none rounded-full"
        placeholder="Pesquise..."
      />
      <ModeToggle />
      <Button size="icon" variant="link" onClick={handleSignOut}>
        <LogOut className="h-5 w-5" />
      </Button>
      <Avatar className="w-7 h-7">
        {userPhoto ? (
          <AvatarImage src={userPhoto} />
        ) : username && (
          <AvatarFallback>{fallback(username)}</AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}
