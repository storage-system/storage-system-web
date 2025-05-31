import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { BarChart3 } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts'
import { CategoryOverviewMetric } from '@/@types/metrics'

const chartConfig = {
  quantidade: {
    label: 'Quantidade',
    color: 'hsl(var(--chart-1))',
  },
  valor: {
    label: 'Valor (R$)',
    color: 'hsl(var(--chart-2))',
  },
}

interface Props {
  data: CategoryOverviewMetric[]
}

export const CategoryBarChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="size-5 text-blue-500" />
          Produtos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  name === 'value'
                    ? `${value} produtos`
                    : `R$ ${value.toLocaleString()}`,
                ]}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
