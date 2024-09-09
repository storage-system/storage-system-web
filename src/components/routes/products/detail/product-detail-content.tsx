import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ProductDetailItem } from './product-detail-item'
import { useProductInfo } from './use-product-info'

export function ProductDetailContent() {
  const { product } = useProductInfo()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Informações do produto</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-row gap-x-12 gap-y-8">
          <img
            className="size-[300px] rounded-lg bg-cover shadow-md"
            src={
              product.photo
                ? 'https://compraco.com.br/cdn/shop/products/Bobinas_de_Aco_23.jpg?v=1591218720'
                : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'
            }
            alt="product-image"
            width={300}
            height={400}
          />
          <div className="grid w-full grid-cols-3 gap-4">
            <ProductDetailItem
              title="Nome do produto"
              content={product?.name}
            />
            <ProductDetailItem
              title="Preço Original"
              content={`$${product?.originalPrice}`}
            />
            <ProductDetailItem
              title="Preço Final"
              content={`$${product?.finalPrice}`}
            />
            <ProductDetailItem
              title="Desconto"
              content={`${product?.discountPercentage}%`}
            />
            <ProductDetailItem
              title="Quantidade em Estoque"
              content={product?.quantityInStock}
            />
            <ProductDetailItem
              title="Data de Fabricação"
              content={product?.manufactureDate}
            />
            <ProductDetailItem
              title="Data de Vencimento"
              content={product?.dueDate}
            />
            <ProductDetailItem
              title="Validade (em dias)"
              content={product?.validityInDays}
            />
            <ProductDetailItem
              title="Unidade de Medida"
              content={product?.unitOfMeasure}
            />
            <ProductDetailItem
              title="Peso"
              content={`${product?.weight} ${product?.unitOfMeasure}`}
            />
            <ProductDetailItem
              title="Fabricante"
              content={product?.manufacturer}
            />
            <ProductDetailItem title="Lote" content={product?.batch} />
            <ProductDetailItem
              title="Altura"
              content={product?.dimensions.height}
            />
            <ProductDetailItem
              title="Largura"
              content={product?.dimensions.width}
            />
            <ProductDetailItem
              title="Profundidade"
              content={product?.dimensions.depth}
            />
            <ProductDetailItem title="Status" content={product?.status} />
          </div>
        </div>
        <div>
          <ProductDetailItem
            title="Descrição:"
            content={product?.description}
          />
        </div>
      </CardContent>
    </Card>
  )
}
