'use client'

import { Product } from '@/@types/product/stock'
import { ProductSearch } from '@/components/routes/products/manage-stock/product-search'
import { StockAdjustment } from '@/components/routes/products/manage-stock/stock-adjustment'
import { StockHistory } from '@/components/routes/products/manage-stock/stock-history'
import { useStockManagement } from '@/components/routes/products/manage-stock/use-stock-management'
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
import { ArrowUpDown, Package } from 'lucide-react'
import { useState } from 'react'

export default function ManageStock() {
  const {
    filteredProducts,
    movements,
    isLoading,
    searchQuery,
    setSearchQuery,
    updateStock,
  } = useStockManagement()

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortKey, setSortKey] = useState<keyof Product>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: keyof Product) => {
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
    <div className="">
      <header className="mb-8">
        <ProductSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScrollArea className="h-[520px] rounded-md border shadow-default">
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
                    onClick={() => handleSort('currentStock')}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Em estoque
                      {sortKey === 'currentStock' && (
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
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <span className="font-medium">{product.name}</span>
                          {product.sku && (
                            <span className="block text-xs text-muted-foreground">
                              SKU: {product.sku}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{product.category || '-'}</TableCell>
                      <TableCell
                        className={`font-medium ${
                          product.currentStock <= 5
                            ? 'text-red-600'
                            : product.currentStock <= 15
                              ? 'text-amber-600'
                              : 'text-green-600'
                        }`}
                      >
                        {product.currentStock}
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

        <div className="flex flex-col space-y-6">
          {selectedProduct ? (
            <StockAdjustment
              product={selectedProduct}
              updateStock={updateStock}
              isLoading={isLoading}
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border bg-accent p-6 text-center shadow-default">
              <Package className="mb-4 size-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Product Selected</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a product from the list to adjust its stock levels
              </p>
            </div>
          )}

          <StockHistory movements={movements} />
        </div>
      </div>
    </div>
  )
}
