import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react'
import { StatsCard } from '../stats-card'

interface Props {
  expiredCount?: number
  criticalCount?: number
  atRiskValue?: number
}

export function OldStockCards({
  atRiskValue,
  criticalCount,
  expiredCount,
}: Props) {
  const riskValueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(atRiskValue ?? 0)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Produtos Vencidos"
        value={expiredCount ?? 0}
        description="necessitam atenção urgente"
        icon={AlertTriangle}
        variant="danger"
        trend={{ value: -5, isPositive: false }}
      />
      <StatsCard
        title="Próximos ao Vencimento"
        value={criticalCount ?? 0}
        description="vencem em 7 dias"
        icon={Calendar}
        variant="warning"
        trend={{ value: 8, isPositive: false }}
      />
      <StatsCard
        title="Valor em Risco"
        value={riskValueFormatted}
        description="valor dos produtos críticos"
        icon={TrendingUp}
        variant="danger"
        trend={{ value: -12, isPositive: false }}
      />
    </div>
  )
}
