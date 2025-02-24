import { Product } from '@/@types/product'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { priceFormatter } from '@/utils/format-currency'

interface Props {
  product: Product
}

export function ProductDetailPricing({ product }: Props) {
  const fields = [
    {
      label: 'Preço original',
      value: priceFormatter.format(product.originalPrice),
    },
    {
      label: 'Preço de venda',
      value: priceFormatter.format(product.finalPrice),
    },
    { label: 'Desconto', value: `${product.discountPercentage}%` },
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
