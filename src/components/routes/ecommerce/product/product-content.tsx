import { GetEcommerceProductDTO } from '@/actions/product-actions'
import { ProductImagesCarousel } from './product-images-carousel'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'

interface ProductContentProps {
  data: GetEcommerceProductDTO
}

export function ProductContent({ data }: ProductContentProps) {
  return (
    <div className="flex w-full justify-center">
      <div className="mx-6 my-24 flex w-full max-w-[1400px] gap-14">
        <div className="flex max-w-[616px] flex-col gap-8">
          <div className="rounded-[4px] border-2 border-gray-200 p-8">
            <img
              src={data.attachments?.[0].url}
              width={616}
              height={464}
              alt={data.name}
            />
          </div>
          <ProductImagesCarousel
            images={Array.from({ length: 4 }).map(
              () => data.attachments?.[0].url || '',
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* Avaliação */}
          <div className="flex gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>
            <p>
              Classificação de 4,7 estrelas{' '}
              <span className="text-primary-foreground opacity-50">
                (21.671 Comentários de usuários)
              </span>
            </p>
          </div>

          {/* Nome */}
          <h3 className="text-xl font-semibold">{data.name}</h3>

          {/* Características */}
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
            <div className="flex gap-2">
              <p className="font-medium">Fabricante:</p>
              <span>{data.manufacturer || 'N/A'}</span>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Lote:</p>
              <span>{data.batch || 'N/A'}</span>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Peso:</p>
              <span>{data.weight} kg</span>
            </div>
            <div className="flex gap-2">
              <p className="font-medium">Unidade:</p>
              <span>{data.unitOfMeasure}</span>
            </div>
            {data.dimensions && (
              <>
                <div className="flex gap-2">
                  <p className="font-medium">Altura:</p>
                  <span>{data.dimensions.height} cm</span>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Largura:</p>
                  <span>{data.dimensions.width} cm</span>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Comprimento:</p>
                  <span>{data.dimensions.length} cm</span>
                </div>
              </>
            )}
          </div>

          {/* Preço */}
          <div>
            {data.originalPrice && (
              <p className="text-lg text-gray-500 line-through">
                R${data.originalPrice.toFixed(2)}
              </p>
            )}
            <div className="flex gap-2">
              <p className="text-2xl font-bold text-blue-500">
                R${data.finalPrice.toFixed(2)}
              </p>
              {data.discountPercentage > 0 && (
                <div className="flex items-center justify-center rounded-[4px] bg-yellow-400 px-2">
                  {data.discountPercentage}% OFF
                </div>
              )}
            </div>
          </div>

          <Separator className="my-5" />

          {/* Ações */}
          <div className="grid h-14 grid-cols-12 gap-2">
            <div className="col-span-3 flex items-center justify-center rounded-[4px] border px-4">
              <button>
                <Plus className="size-5 text-primary" />
              </button>
              <p className="flex flex-1 justify-center">01</p>
              <button>
                <Minus className="size-5 text-primary" />
              </button>
            </div>
            <Button className="col-span-5 h-full gap-2 rounded-[4px] bg-primary font-semibold uppercase">
              Adicionar ao Carrinho
              <ShoppingCart />
            </Button>
            <Button
              variant="outline"
              className="col-span-4 h-full gap-2 rounded-[4px] border-2 border-primary bg-transparent font-semibold uppercase text-primary"
            >
              Comprar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
