import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Plus, Minus, AlertTriangle } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'add',
    description: 'Produto adicionado: Açúcar Cristal 1kg',
    time: 'há 2 horas',
    icon: Plus,
  },
  {
    id: 2,
    type: 'expire',
    description: 'Produto vencido: Leite Desnatado 1L',
    time: 'há 4 horas',
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: 'remove',
    description: 'Produto removido: Suco de Uva 500ml',
    time: 'há 6 horas',
    icon: Minus,
  },
  {
    id: 4,
    type: 'add',
    description: 'Categoria criada: Produtos de Limpeza',
    time: 'há 1 dia',
    icon: Package,
  },
]

export const RecentActivity = () => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'add':
        return 'text-green-600'
      case 'expire':
        return 'text-red-600'
      case 'remove':
        return 'text-orange-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <div
                className={`rounded-full bg-muted p-2 ${getActivityColor(activity.type)}`}
              >
                <activity.icon className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
