import { Product } from '@/@types/product'
import { StatusProduct } from '@/@types/status-product'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  product: Product
}

export function ProductGeneralInfo({ product }: Props) {
  const file = product?.attachments[0]

  return (
    <div className="mx-4 flex space-x-8">
      <img
        className="size-[300px] rounded-lg bg-cover shadow-md"
        src={file?.url}
        alt="product-image"
        width={300}
        height={400}
      />
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <p>Nome</p>
          <Input value={product.name} />
        </div>
        <div className="space-y-2">
          <p>Descrição</p>
          <Textarea value={product.description} className="resize-none" />
        </div>
        <div className="space-y-2">
          <p>Status</p>
          <Switch checked={product.status === StatusProduct.ACTIVE} />
        </div>
      </div>
    </div>
  )
}
