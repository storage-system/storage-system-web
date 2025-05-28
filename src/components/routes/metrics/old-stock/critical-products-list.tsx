import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Clock, Calendar } from 'lucide-react'

const criticalProducts = [
  {
    id: 1,
    name: 'Leite Integral 1L',
    category: 'Alimentos',
    quantity: 15,
    expirationDate: '2025-05-30',
    daysToExpire: 3,
    status: 'critical',
  },
  {
    id: 2,
    name: 'Suco de Laranja 500ml',
    category: 'Bebidas',
    quantity: 8,
    expirationDate: '2025-06-02',
    daysToExpire: 6,
    status: 'warning',
  },
  {
    id: 3,
    name: 'Iogurte Natural',
    category: 'Alimentos',
    quantity: 12,
    expirationDate: '2025-06-05',
    daysToExpire: 9,
    status: 'warning',
  },
  {
    id: 4,
    name: 'Paracetamol 500mg',
    category: 'Medicamentos',
    quantity: 5,
    expirationDate: '2025-05-28',
    daysToExpire: 1,
    status: 'expired',
  },
]

export const CriticalProductsList = () => {
  const getStatusBadge = (status: string, days: number) => {
    switch (status) {
      case 'expired':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="size-3" />
            Vencido
          </Badge>
        )
      case 'critical':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Clock className="size-3" />
            {days} dias
          </Badge>
        )
      case 'warning':
        return (
          <Badge className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600">
            <Calendar className="size-3" />
            {days} dias
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-red-500" />
          Produtos Críticos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{product.category}</span>
                  <span>Qtd: {product.quantity}</span>
                  <span>
                    Vence:{' '}
                    {new Date(product.expirationDate).toLocaleDateString(
                      'pt-BR',
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(product.status, product.daysToExpire)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
