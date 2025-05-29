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
import { ProductBase } from '@/@types/metrics'

interface Props {
  expiredProductsData: ProductBase[]
}

export const ExpiredProductsTable = ({ expiredProductsData }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [periodFilter, setPeriodFilter] = useState('all')

  const filteredProducts = expiredProductsData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    let matchesPeriod = true
    if (periodFilter !== 'all') {
      const days = parseInt(periodFilter)
      matchesPeriod = Math.abs(product.daysToExpire) <= days
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
      <CardHeader className="">
        <CardTitle className="mb-2 flex items-center gap-2">
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
              <SelectItem value="60">Até 60 dias</SelectItem>
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
                      {new Date(product.dueDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{Math.abs(product.daysToExpire)}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {getExpiredBadge(Math.abs(product.daysToExpire))}
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
