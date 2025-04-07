import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Product,
  StockOperation,
  UpdateProductStockRequest,
} from '@/@types/product/stock'

interface StockAdjustmentProps {
  product: Product
  updateStock: (request: UpdateProductStockRequest) => Promise<void>
  isLoading: boolean
}

export const StockAdjustment: React.FC<StockAdjustmentProps> = ({
  product,
  updateStock,
  isLoading,
}) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [operation, setOperation] = useState<StockOperation>('ADD')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (quantity <= 0) return

    await updateStock({
      productId: product.id,
      quantity,
      operation,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          Ajustar estoque: {product.name}
        </CardTitle>
        <CardDescription>
          Estoque atual:{' '}
          <span className="font-semibold">{product.currentStock}</span> units
          {product.sku && (
            <span className="block text-sm text-muted-foreground">
              SKU: {product.sku}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs
            defaultValue="add"
            onValueChange={(value) => setOperation(value as StockOperation)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ADD" className="justify-center">
                <Plus className="mr-2 size-4" />
                Adicionar
              </TabsTrigger>
              <TabsTrigger value="REMOVE" className="justify-center">
                <Minus className="mr-2 size-4" />
                Remover
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ADD" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="add-quantity">Quantidade para adicionar</Label>
                <Input
                  id="add-quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  placeholder="Enter quantity"
                />
              </div>
            </TabsContent>
            <TabsContent value="REMOVE" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="remove-quantity">
                  Quantitdade para remover
                </Label>
                <Input
                  id="remove-quantity"
                  type="number"
                  min={1}
                  max={product.currentStock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  placeholder="Enter quantity"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || quantity <= 0}
            >
              {isLoading ? 'Processando...' : 'Atualizar estoque'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
