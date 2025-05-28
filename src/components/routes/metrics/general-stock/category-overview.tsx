import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Alimentos', value: 35, color: '#8b5cf6' },
  { name: 'Bebidas', value: 25, color: '#06b6d4' },
  { name: 'Medicamentos', value: 20, color: '#10b981' },
  { name: 'Cosméticos', value: 12, color: '#f59e0b' },
  { name: 'Outros', value: 8, color: '#ef4444' },
]

export const CategoryOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
