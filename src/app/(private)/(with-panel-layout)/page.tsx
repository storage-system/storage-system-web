import { DashboardTabs } from '@/@types/dashboard-tabs'
import { NewStockMetrics } from '@/components/routes/metrics/general-stock-metrics'
import { OldStockMetrics } from '@/components/routes/metrics/old-stock-metrics'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authOptions } from '@/lib/auth/auth-options'
import { getServerSession } from 'next-auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.name

  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <h3 className="font-bold text-textPrimary">Olá, {username}</h3>
        <p className="text-gray-400">
          Bem-vindo ao painel de controle do seu sistema de gerenciamento de
          estoque
        </p>
      </Card>
      <Tabs defaultValue={DashboardTabs.OLD_STOCK}>
        <TabsList>
          <TabsTrigger value={DashboardTabs.OLD_STOCK}>Old stock</TabsTrigger>
          <TabsTrigger value={DashboardTabs.GENERAL_STOCK}>
            Stock Geral
          </TabsTrigger>
        </TabsList>
        <TabsContent value={DashboardTabs.OLD_STOCK}>
          <OldStockMetrics />
        </TabsContent>
        <TabsContent value={DashboardTabs.GENERAL_STOCK}>
          <NewStockMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
