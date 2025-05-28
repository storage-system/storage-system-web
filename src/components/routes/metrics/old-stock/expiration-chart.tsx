import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Vencidos',
    quantidade: 12,
    color: '#ef4444',
  },
  {
    name: '7 dias',
    quantidade: 8,
    color: '#f59e0b',
  },
  {
    name: '15 dias',
    quantidade: 15,
    color: '#eab308',
  },
  {
    name: '30 dias',
    quantidade: 23,
    color: '#22c55e',
  },
  {
    name: '30+ dias',
    quantidade: 45,
    color: '#3b82f6',
  },
]

export const ExpirationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos por Vencimento</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Bar
              dataKey="quantidade"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
