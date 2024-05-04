import { authOptions } from "@/lib/auth/auth-options";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const username = session?.user?.name

  return (
    <div className="shadow-default bg-accent p-4 rounded-lg">
      <h3 className="text-textPrimary">Bem vindo, {username}</h3>
    </div>
  );
}
