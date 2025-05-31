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
import { DateData } from '@/@types/metrics'

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

interface Props {
  data: DateData[]
}

export const ManufacturingDateChart = ({ data }: Props) => {
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
              data={data}
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
