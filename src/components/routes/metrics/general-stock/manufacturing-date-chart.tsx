import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Calendar } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts'

const dateData = [
  { periodo: 'Jan/24', fabricacao: 234, validade: 198, vencidos: 36 },
  { periodo: 'Fev/24', fabricacao: 267, validade: 223, vencidos: 44 },
  { periodo: 'Mar/24', fabricacao: 289, validade: 251, vencidos: 38 },
  { periodo: 'Abr/24', fabricacao: 312, validade: 278, vencidos: 34 },
  { periodo: 'Mai/24', fabricacao: 298, validade: 264, vencidos: 34 },
  { periodo: 'Jun/24', fabricacao: 334, validade: 301, vencidos: 33 },
]

const chartConfig = {
  fabricacao: {
    label: 'Produtos Fabricados',
    color: 'hsl(var(--chart-1))',
  },
  validade: {
    label: 'Produtos Válidos',
    color: 'hsl(var(--chart-2))',
  },
  vencidos: {
    label: 'Produtos Vencidos',
    color: 'hsl(var(--chart-3))',
  },
}

export const ManufacturingDateChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calendar className="size-5 text-green-500" />
          Fabricação vs Validade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={dateData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="periodo" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="fabricacao"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
                name="Fabricados"
              />
              <Line
                type="monotone"
                dataKey="validade"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
                name="Válidos"
              />
              <Line
                type="monotone"
                dataKey="vencidos"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444' }}
                name="Vencidos"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
