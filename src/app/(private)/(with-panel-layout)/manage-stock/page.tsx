'use client'

import { ListProduct } from '@/@types/product'
import { ProductSearch } from '@/components/routes/products/manage-stock/product-search'
import { ProductStockTable } from '@/components/routes/products/manage-stock/product-stock-table'
import { StockAdjustment } from '@/components/routes/products/manage-stock/stock-adjustment'
import { StockHistory } from '@/components/routes/products/manage-stock/stock-history'
import { useStockManagement } from '@/components/routes/products/manage-stock/use-stock-management'
import { Package } from 'lucide-react'
import { useState } from 'react'

export default function ManageStock() {
  const {
    filteredProducts,
    movements,
    isLoading,
    searchQuery,
    setSearchQuery,
    updateStock,
    isUpdatingStock,
  } = useStockManagement()

  const [selectedProduct, setSelectedProduct] = useState<ListProduct | null>(
    null,
  )

  return (
    <div className="">
      <header className="mb-8">
        <ProductSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProductStockTable
          filteredProducts={filteredProducts}
          setSelectedProduct={setSelectedProduct}
        />

        <div className="flex flex-col space-y-6">
          {selectedProduct ? (
            <StockAdjustment
              product={selectedProduct}
              updateStock={updateStock}
              isLoading={isLoading || isUpdatingStock}
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border bg-accent p-6 text-center shadow-default">
              <Package className="mb-4 size-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">
                Nenhum produto selecionado
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Selecione um produto da lista para ajustar os seus níveis de
                stock
              </p>
            </div>
          )}

          <StockHistory movements={movements} />
        </div>
      </div>
    </div>
  )
}
