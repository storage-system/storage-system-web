import { ProductBase } from '@/@types/metrics'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Calendar, Clock } from 'lucide-react'

export const CriticalProductsList = ({
  expiredProducts,
  criticalProducts,
  warningProducts,
}: {
  expiredProducts: ProductBase[]
  criticalProducts: ProductBase[]
  warningProducts: ProductBase[]
}) => {
  const allProducts = [
    ...expiredProducts,
    ...criticalProducts,
    ...warningProducts,
  ]

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
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{product.category}</span>
                  <span>Qtd: {product.quantity}</span>
                  <span>
                    Vence:{' '}
                    {new Date(product.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                {getStatusBadge(product.status, product.daysToExpire)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
