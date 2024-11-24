import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Package,
  Percent,
  Box,
  Calendar,
  Clock,
  Ruler,
  Factory,
  Hash,
  ArrowUpDown,
} from 'lucide-react'
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
    {
      title: 'Nome do produto',
      content: product.name,
      icon: <Package size={16} />,
    },
    {
      title: 'Preço Original',
      content: formatMetricValue(product.originalPrice),
    },
    {
      title: 'Preço Final',
      content: formatMetricValue(product.finalPrice),
    },
    {
      title: 'Desconto',
      content: `${product.discountPercentage}%`,
      icon: <Percent size={16} />,
    },
    {
      title: 'Quantidade em Estoque',
      content: product.quantityInStock,
      icon: <Box size={16} />,
    },
    {
      title: 'Data de Fabricação',
      content: dateFormatter.format(new Date(product.manufactureDate)),
      icon: <Calendar size={16} />,
    },
    {
      title: 'Data de Vencimento',
      content: dateFormatter.format(new Date(product.dueDate)),
      icon: <Calendar size={16} />,
    },
    {
      title: 'Validade (em dias)',
      content: product.validityInDays,
      icon: <Clock size={16} />,
    },
    {
      title: 'Unidade de Medida',
      content: product.unitOfMeasure,
      icon: <Ruler size={16} />,
    },
    {
      title: 'Peso',
      content: `${product.weight} ${product.unitOfMeasure}`,
      icon: <Box size={16} />,
    },
    {
      title: 'Fabricante',
      content: product.manufacturer,
      icon: <Factory size={16} />,
    },
    { title: 'Lote', content: product.batch, icon: <Hash size={16} /> },
    {
      title: 'Altura',
      content: product.dimensions?.height,
      icon: <ArrowUpDown size={16} />,
    },
    {
      title: 'Largura',
      content: product.dimensions?.width,
      icon: <ArrowUpDown size={16} />,
    },
    {
      title: 'Profundidade',
      content: product.dimensions?.depth,
      icon: <ArrowUpDown size={16} />,
    },
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
                icon={item.icon}
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
