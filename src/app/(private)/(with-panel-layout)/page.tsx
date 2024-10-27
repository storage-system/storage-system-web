import { Card } from '@/components/ui/card'
import { authOptions } from '@/lib/auth/auth-options'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const username = session?.user?.name

  return (
    <Card>
      <h3 className="text-textPrimary">Bem vindo, {username}</h3>
    </Card>
  )
}
