import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AlertTriangle, Search, Calendar } from 'lucide-react'

// Mock data para produtos vencidos
const expiredProductsData = [
  {
    id: 1,
    name: 'Leite Integral 1L',
    category: 'Alimentos',
    quantity: 15,
    expirationDate: '2025-05-25',
    daysExpired: 2,
    value: 'R$ 4,50',
  },
  {
    id: 2,
    name: 'Suco de Laranja 500ml',
    category: 'Bebidas',
    quantity: 8,
    expirationDate: '2025-05-20',
    daysExpired: 7,
    value: 'R$ 3,20',
  },
  {
    id: 3,
    name: 'Iogurte Natural',
    category: 'Alimentos',
    quantity: 12,
    expirationDate: '2025-05-10',
    daysExpired: 17,
    value: 'R$ 2,80',
  },
  {
    id: 4,
    name: 'Paracetamol 500mg',
    category: 'Medicamentos',
    quantity: 5,
    expirationDate: '2025-04-30',
    daysExpired: 27,
    value: 'R$ 8,90',
  },
  {
    id: 5,
    name: 'Shampoo Anticaspa',
    category: 'Cosméticos',
    quantity: 3,
    expirationDate: '2025-04-15',
    daysExpired: 42,
    value: 'R$ 12,50',
  },
  {
    id: 6,
    name: 'Biscoito Cream Cracker',
    category: 'Alimentos',
    quantity: 20,
    expirationDate: '2025-04-10',
    daysExpired: 47,
    value: 'R$ 1,90',
  },
]

export const ExpiredProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [periodFilter, setPeriodFilter] = useState('all')

  const filteredProducts = expiredProductsData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    let matchesPeriod = true
    if (periodFilter !== 'all') {
      const days = parseInt(periodFilter)
      matchesPeriod = product.daysExpired <= days
    }

    return matchesSearch && matchesPeriod
  })

  const getExpiredBadge = (daysExpired: number) => {
    if (daysExpired <= 15) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="size-3" />
          {daysExpired} dias
        </Badge>
      )
    } else if (daysExpired <= 30) {
      return (
        <Badge className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600">
          <Calendar className="size-3" />
          {daysExpired} dias
        </Badge>
      )
    } else {
      return (
        <Badge className="flex items-center gap-1 bg-red-700 hover:bg-red-800">
          <AlertTriangle className="size-3" />
          {daysExpired} dias
        </Badge>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-red-500" />
          Produtos Vencidos
        </CardTitle>

        {/* Filtros */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome do produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Período de vencimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="15">Até 15 dias</SelectItem>
              <SelectItem value="30">Até 30 dias</SelectItem>
              <SelectItem value="45">Até 45 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Data de Vencimento</TableHead>
                <TableHead>Dias Vencido</TableHead>
                <TableHead>Valor Unit.</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      {new Date(product.expirationDate).toLocaleDateString(
                        'pt-BR',
                      )}
                    </TableCell>
                    <TableCell>{product.daysExpired}</TableCell>
                    <TableCell>{product.value}</TableCell>
                    <TableCell>
                      {getExpiredBadge(product.daysExpired)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    Nenhum produto encontrado com os filtros aplicados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {expiredProductsData.length}{' '}
            produtos
          </div>
        )}
      </CardContent>
    </Card>
  )
}
