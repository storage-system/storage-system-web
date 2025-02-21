import { Product } from '@/@types/product'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { dateFormatter } from '@/utils/format-date'

interface Props {
  product: Product
}

export function ProductDetailAdditionalInfo({ product }: Props) {
  const fields = [
    {
      label: 'Lote',
      value: product.batch,
    },
    {
      label: 'Fabricante',
      value: product.manufacturer,
    },
    {
      label: 'Data de fabricação',
      value: dateFormatter.format(new Date(product.manufactureDate)),
    },
    {
      label: 'Data de vencimento',
      value: dateFormatter.format(new Date(product.dueDate)),
    },
    {
      label: 'Validade em dias',
      value: product.validityInDays,
    },
  ]

  return (
    <Card className="mt-4">
      <div className="flex w-full flex-wrap gap-4">
        {fields.map((field) => (
          <div key={field.label} className="min-w-[200px] space-y-1">
            <p>{field.label}</p>
            <Input value={field.value} />
          </div>
        ))}
      </div>
    </Card>
  )
}
