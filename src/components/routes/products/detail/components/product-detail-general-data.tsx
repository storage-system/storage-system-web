import { Product } from '@/@types/product'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Props {
  product: Product
}

export function ProductDetailGeneralData({ product }: Props) {
  const fields = [
    {
      label: 'Largura',
      value: `${product.dimensions.width} ${product.unitOfMeasure}`,
    },
    {
      label: 'Altura',
      value: `${product.dimensions.height} ${product.unitOfMeasure}`,
    },
    {
      label: 'Profundidade',
      value: `${product.dimensions.depth} ${product.unitOfMeasure}`,
    },
    {
      label: 'Peso',
      value: `${product.weight} kg`,
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
