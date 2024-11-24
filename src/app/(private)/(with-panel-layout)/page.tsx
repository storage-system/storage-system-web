import { CardsMetrics } from '@/components/routes/metrics/cards-metrics'
import { Card } from '@/components/ui/card'
import { authOptions } from '@/lib/auth/auth-options'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.name

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-bold text-textPrimary">Bem vindo, {username}</h3>
      </Card>
      <CardsMetrics />
    </div>
  )
}
