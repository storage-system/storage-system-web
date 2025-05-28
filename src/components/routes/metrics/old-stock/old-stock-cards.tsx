import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react'
import { StatsCard } from '../stats-card'

export function OldStockCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Produtos Vencidos"
        value="12"
        description="necessitam atenção urgente"
        icon={AlertTriangle}
        variant="danger"
        trend={{ value: -5, isPositive: false }}
      />
      <StatsCard
        title="Próximos ao Vencimento"
        value="23"
        description="vencem em 7 dias"
        icon={Calendar}
        variant="warning"
        trend={{ value: 8, isPositive: false }}
      />
      <StatsCard
        title="Valor em Risco"
        value="R$ 8.450"
        description="valor dos produtos críticos"
        icon={TrendingUp}
        variant="danger"
        trend={{ value: -12, isPositive: false }}
      />
    </div>
  )
}
