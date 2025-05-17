/* eslint-disable prettier/prettier */
import { ListProduct } from '@/@types/product'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  filteredProducts: ListProduct[]
  setSelectedProduct: Dispatch<SetStateAction<ListProduct | null>>
}

export function ProductStockTable({
  filteredProducts,
  setSelectedProduct,
}: Props) {
  const [sortKey, setSortKey] = useState<keyof ListProduct>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: keyof ListProduct) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a?.[sortKey]
    const bValue = b?.[sortKey]

    if (aValue === undefined || bValue === undefined) return 0

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="lg:col-span-2">
      <ScrollArea className="h-[600px] rounded-md border shadow-default">
        <Table className="bg-accent">
          <TableHeader className="sticky top-0">
            <TableRow>
              <TableHead
                onClick={() => handleSort('name')}
                className="w-2/5 cursor-pointer"
              >
                <div className="flex items-center">
                  Nome
                  {sortKey === 'name' && (
                    <ArrowUpDown className="ml-2 size-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead
                onClick={() => handleSort('quantityInStock')}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  Em estoque
                  {sortKey === 'quantityInStock' && (
                    <ArrowUpDown className="ml-2 size-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-full text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              sortedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{product.name}</span>
                      {product.batch && (
                        <span className="block text-xs text-muted-foreground">
                          Lote: {product.batch}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product?.categoryIds?.[0] || '-'}</TableCell>
                  <TableCell
                    className={`font-medium ${product.quantityInStock <= 5
                      ? 'text-red-600'
                      : product.quantityInStock <= 15
                        ? 'text-amber-600'
                        : 'text-green-600'
                      }`}
                  >
                    {product.quantityInStock}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Ajustar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
