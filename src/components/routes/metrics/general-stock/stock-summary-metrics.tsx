import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface Props {
  criticalStockProducts: number
  validProducts: number
}

export const StockSummaryMetrics = (data: Props) => {
  const metrics = [
    {
      title: 'Taxa de Rotatividade',
      value: '78%',
      description: 'produtos vendidos/mês',
      progress: 78,
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Produtos em Estoque Crítico',
      value: data.criticalStockProducts,
      description: 'abaixo do nível mínimo',
      progress: 15,
      icon: AlertTriangle,
      trend: { value: -3, isPositive: true },
    },
    {
      title: 'Taxa de Validade OK',
      value: `${data.validProducts.toFixed(2)}%`,
      description: 'produtos dentro da validade',
      progress: data.validProducts,
      icon: CheckCircle,
      trend: { value: 2, isPositive: true },
    },
    {
      title: 'Tempo Médio em Estoque',
      value: '45 dias',
      description: 'desde a entrada',
      progress: 67,
      icon: Clock,
      trend: { value: -8, isPositive: true },
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {metric.value}
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              {metric.description}
            </p>
            <div className="space-y-2">
              <Progress value={metric.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {metric.progress}%
                </span>
                <span
                  className={`${metric.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
                >
                  {metric.trend.isPositive ? '+' : ''}
                  {metric.trend.value}% vs mês anterior
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
