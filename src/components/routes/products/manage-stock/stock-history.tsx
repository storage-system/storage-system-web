import React from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StockMovement } from '@/@types/product/stock'

interface StockHistoryProps {
  movements: StockMovement[]
}

export const StockHistory: React.FC<StockHistoryProps> = ({ movements }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Histórico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">
              No stock movements recorded yet.
            </p>
          ) : (
            movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between rounded-md bg-muted/40 p-3"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-full p-2 ${
                      movement.operation === 'ADD'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {movement.operation === 'ADD' ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{movement.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.operation === 'ADD' ? 'Adicionou' : 'Removeu'}{' '}
                      {movement.quantity} unidades
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(movement.timestamp)}
                  </p>
                  {movement.performedBy && (
                    <p className="text-xs text-muted-foreground">
                      By: {movement.performedBy}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
