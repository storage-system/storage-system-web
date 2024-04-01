import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function HeaderContent() {
  return (
    <div className="flex space-x-4 bg-accent items-center justify-center rounded-full shadow-default p-2">
      <Input
        className="h-9 bg-gray-100 dark:bg-black/20 border-none rounded-full"
        placeholder="Pesquise..."
      />
      <ModeToggle />
      <Avatar>
        <AvatarFallback>PV</AvatarFallback>
      </Avatar>
    </div>
  );
}
