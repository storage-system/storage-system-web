import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ProductDetailItem } from './product-detail-item'
import { useProductInfo } from './use-product-info'
import { dateFormatter } from '@/utils/format-date'
import { formatMetricValue } from '@/utils/format-currency'
import { ProductStatusCell } from '../list/cell/product-status-cell'

export function ProductDetailContent() {
  const { product } = useProductInfo()
  const file = product?.attachments[0]

  if (!product) return null

  const productDetails = [
    { title: 'Nome do produto', content: product.name },
    {
      title: 'Preço Original',
      content: formatMetricValue(product.originalPrice),
    },
    { title: 'Preço Final', content: formatMetricValue(product.finalPrice) },
    { title: 'Desconto', content: `${product.discountPercentage}%` },
    { title: 'Quantidade em Estoque', content: product.quantityInStock },
    {
      title: 'Data de Fabricação',
      content: dateFormatter.format(new Date(product.manufactureDate)),
    },
    {
      title: 'Data de Vencimento',
      content: dateFormatter.format(new Date(product.dueDate)),
    },
    { title: 'Validade (em dias)', content: product.validityInDays },
    { title: 'Unidade de Medida', content: product.unitOfMeasure },
    { title: 'Peso', content: `${product.weight} ${product.unitOfMeasure}` },
    { title: 'Fabricante', content: product.manufacturer },
    { title: 'Lote', content: product.batch },
    { title: 'Altura', content: product.dimensions?.height },
    { title: 'Largura', content: product.dimensions?.width },
    { title: 'Profundidade', content: product.dimensions?.depth },
    {
      title: 'Status',
      content: <ProductStatusCell status={product.status} />,
      className: 'flex flex-col items-start',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Informações do produto</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-row gap-x-12 gap-y-8">
          <img
            className="size-[300px] rounded-lg bg-cover shadow-md"
            src={file?.url}
            alt="product-image"
            width={300}
            height={400}
          />
          <div className="grid w-full grid-cols-3 gap-4">
            {productDetails.map((item, index) => (
              <ProductDetailItem
                key={index}
                title={item.title}
                content={item.content}
                className={item.className}
              />
            ))}
          </div>
        </div>
        <div>
          <ProductDetailItem title="Descrição:" content={product.description} />
        </div>
      </CardContent>
    </Card>
  )
}
