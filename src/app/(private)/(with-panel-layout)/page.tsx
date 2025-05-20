import { DashboardTabs } from '@/@types/dashboard-tabs'
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
        <h3 className="font-bold text-textPrimary">Bem vindo, {username}</h3>
      </Card>
      <Tabs>
        <TabsList>
          <TabsTrigger value={DashboardTabs.OLD_STOCK}>Old stock</TabsTrigger>
          <TabsTrigger value={DashboardTabs.NEW_STOCK}>New stock</TabsTrigger>
        </TabsList>
        <TabsContent value={DashboardTabs.OLD_STOCK}></TabsContent>
        <TabsContent value={DashboardTabs.NEW_STOCK}></TabsContent>
      </Tabs>
    </div>
  )
}
