import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { BarChart3 } from 'lucide-react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts'

const categoryData = [
  { categoria: 'Alimentos', quantidade: 234, valor: 45600, color: '#8b5cf6' },
  { categoria: 'Bebidas', quantidade: 156, valor: 28900, color: '#06b6d4' },
  { categoria: 'Medicamentos', quantidade: 89, valor: 67800, color: '#10b981' },
  { categoria: 'Cosméticos', quantidade: 78, valor: 34200, color: '#f59e0b' },
  { categoria: 'Limpeza', quantidade: 67, valor: 19500, color: '#ef4444' },
  { categoria: 'Outros', quantidade: 45, valor: 12300, color: '#6b7280' },
]

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

export const CategoryBarChart = () => {
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
              data={categoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="categoria"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  name === 'quantidade'
                    ? `${value} produtos`
                    : `R$ ${value.toLocaleString()}`,
                  name === 'quantidade' ? 'Quantidade' : 'Valor Total',
                ]}
              />
              <Bar dataKey="quantidade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
