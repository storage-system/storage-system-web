import {
  Product,
  StockMovement,
  UpdateProductStockRequest,
} from '@/@types/product/stock'
import React, { useState, useCallback } from 'react'
import { toast } from 'sonner'

// Mock data for demo purposes
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS',
    currentStock: 25,
    category: 'Electronics',
    sku: 'LAP-DEL-001',
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    currentStock: 42,
    category: 'Electronics',
    sku: 'PHN-APP-001',
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    currentStock: 15,
    category: 'Furniture',
    sku: 'FRN-CHR-001',
  },
  {
    id: '4',
    name: 'Wireless Mouse',
    currentStock: 67,
    category: 'Accessories',
    sku: 'ACC-MOU-001',
  },
  {
    id: '5',
    name: 'USB-C Cable 2m',
    currentStock: 122,
    category: 'Accessories',
    sku: 'ACC-CBL-001',
  },
  {
    id: '6',
    name: 'HDMI Monitor Cable',
    currentStock: 38,
    category: 'Accessories',
    sku: 'ACC-CBL-002',
  },
  {
    id: '7',
    name: 'Desk Lamp',
    currentStock: 19,
    category: 'Furniture',
    sku: 'FRN-LMP-001',
  },
  {
    id: '8',
    name: 'External SSD 1TB',
    currentStock: 31,
    category: 'Storage',
    sku: 'STR-SSD-001',
  },
]

const initialMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Laptop Dell XPS',
    quantity: 5,
    operation: 'ADD',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    performedBy: 'System Admin',
  },
  {
    id: '2',
    productId: '2',
    productName: 'iPhone 14 Pro',
    quantity: 3,
    operation: 'REMOVE',
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    performedBy: 'System Admin',
  },
]

export function useStockManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [movements, setMovements] = useState<StockMovement[]>(initialMovements)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return products
    const query = searchQuery.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query),
    )
  }, [products, searchQuery])

  const updateStock = useCallback(
    async (request: UpdateProductStockRequest) => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // await api.updateProductStock(request);

        // For this demo, we'll update the state directly
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (product.id === request.productId) {
              const newStock =
                request.operation === 'ADD'
                  ? product.currentStock + request.quantity
                  : product.currentStock - request.quantity

              return {
                ...product,
                currentStock: Math.max(0, newStock), // Ensure stock doesn't go negative
              }
            }
            return product
          }),
        )

        // Add movement to history
        const product = products.find((p) => p.id === request.productId)
        if (product) {
          const newMovement: StockMovement = {
            id: Date.now().toString(),
            productId: request.productId,
            productName: product.name,
            quantity: request.quantity,
            operation: request.operation,
            timestamp: new Date(),
            performedBy: 'Current User',
          }

          setMovements((prev) => [newMovement, ...prev])
        }

        toast.success(
          request.operation === 'ADD'
            ? `Added ${request.quantity} items to inventory`
            : `Removed ${request.quantity} items from inventory`,
        )
      } catch (error) {
        console.error('Failed to update stock:', error)
        toast.error('Failed to update stock. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [products],
  )

  return {
    products,
    filteredProducts,
    movements,
    isLoading,
    searchQuery,
    setSearchQuery,
    updateStock,
  }
}
