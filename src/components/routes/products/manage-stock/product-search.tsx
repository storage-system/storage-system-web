import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ProductSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function ProductSearch({
  searchQuery,
  setSearchQuery,
}: ProductSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Pesquisar produtos por nome, SKU ou categoria..."
        className="w-full pl-10"
      />
    </div>
  )
}
