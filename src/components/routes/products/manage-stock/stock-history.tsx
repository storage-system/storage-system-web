/* eslint-disable prettier/prettier */
import React from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StockMovement } from '@/@types/product/stock-movements'

interface StockHistoryProps {
  movements: StockMovement[] | undefined
}

export const StockHistory: React.FC<StockHistoryProps> = ({ movements }) => {
  const formatDate = (date: string | Date) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date

    if (isNaN(parsedDate.getTime())) {
      return 'Data inválida'
    }

    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsedDate)
  }

  if (!movements) {
    return
  }

  return (
    <Card className="w-full p-0">
      <CardHeader>
        <CardTitle className="text-xl">Histórico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] space-y-4 overflow-y-auto">
          {movements.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground">
              Ainda não foram registrados movimentos de estoque.
            </p>
          ) : (
            movements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between rounded-md bg-muted/40 p-3"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`rounded-full p-2 ${movement.operation === 'INCREASE'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {movement.operation === 'INCREASE' ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{movement.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {movement.operation === 'INCREASE' ? 'Adicionou' : 'Removeu'}{' '}
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
                      Por: {movement.performedBy}
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
