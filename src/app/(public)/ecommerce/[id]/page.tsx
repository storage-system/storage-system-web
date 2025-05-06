'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useProductsService } from '@/services/ecommerce-service/products-service'
import { useQuery } from '@tanstack/react-query'
import { Minus, Plus, ShoppingCart, Star } from 'lucide-react'


export default function Product() {
  const { getProduct } = useProductsService()

  const { data: productData } = useQuery({
    queryKey: ['retrieve-product'],
    queryFn: () => getProduct('1'),
  })

  console.log(productData)

  return (
    <div className="flex w-full justify-center">
      <div className="mx-6 my-24 flex w-full max-w-[1400px] gap-14">
        <div className="rounded-[4px] border-2 border-gray-200 p-8">
          <img
            src={productData?.image}
            width={616}
            height={464}
            alt={productData?.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-500 text-yellow-500"
                  strokeWidth={2}
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
          <div>
            <h3>
              Apple MacBook Pro 2020 com chip Apple M1 (13 polegadas, 8 GB de
              RAM, 256 GB de armazenamento SSD) - Cinza espacial
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-2">
                <p className="text-gray-600">Modelo:</p>{' '}
                <span className="">A264671</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-lg text-gray-500 line-through">R$1.999,00</p>
            <div className="flex gap-2 ">
              <p className="text-2xl font-bold text-blue-500">R$1.999,00</p>
              <div className="flex items-center justify-center rounded-[4px] bg-yellow-400 px-2">
                21% OFF
              </div>
            </div>
          </div>
          <Separator className="my-5" />
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
              variant={'outline'}
              className="col-span-4 h-full gap-2 rounded-[4px] border-2 border-primary !bg-transparent font-semibold uppercase !text-primary"
            >
              Comprar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
