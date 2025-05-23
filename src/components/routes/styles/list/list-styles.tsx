'use client'

import { buttonVariants } from '@/components/ui/button'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { useEcommerceManagementService } from '@/services/ecommerce-management-service'
import { useQuery } from '@tanstack/react-query'
import { Palette, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// function ColorPreview({ label }: { label: string }) {
//   const randomColor = getRandomColor().toUpperCase()
//   return (
//     <TooltipRoot>
//       <TooltipTrigger>
//         <div
//           className="size-8 rounded-full"
//           style={{ background: randomColor }}
//         />
//       </TooltipTrigger>
//       <TooltipContent>
//         {label} : {randomColor}
//       </TooltipContent>
//     </TooltipRoot>
//   )
// }

export function ListEcommerce() {
  const { getEcommerce } = useEcommerceManagementService()
  // const { getFileUrlService } = useFilesService()

  const router = useRouter()

  const ecommerceQuery = useQuery({
    queryKey: ['active-ecommerce'],
    queryFn: getEcommerce,
  })

  const data = ecommerceQuery.data

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {data ? (
        <div
          className="group w-[350px] cursor-pointer rounded-md border-2 border-purple-100"
          onClick={() =>
            router.push(
              `${PrivateRoutes.ECOMMERCE_MANAGEMENT_UPDATE}/${data?.id}`,
            )
          }
        >
          <div className="h-[240px] overflow-hidden bg-purple-100 px-2 pt-2">
            <div className="bg-white transition-all duration-300 group-hover:scale-105">
              <img
                className="object-cover "
                src={ecommerceQuery.data?.previewUrl}
                alt=""
              />
            </div>
          </div>
          <div className="bg-white p-4">
            <span className="rounded-md border border-green-500 px-2 text-lg font-medium text-green-500">
              Publicado
            </span>
            <p className="text-xl">{data?.name}</p>
          </div>
        </div>
      ) : (
        <div className="col-span-full flex h-full flex-col items-center justify-center gap-4">
          <div className="flex h-[190px] w-[224px] items-center justify-center bg-[url(/ecommerce-not-found.svg)]">
            <Palette size={100} className="text-primary" />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl">Você não possui um ecommerce</p>
            <p className="w-[360px] text-center text-lg font-normal">
              Crie seu primeiro estilo para personalizar o visual do seu
              e-commerce e destacar seus produtos.
            </p>
            <Link
              href={PrivateRoutes.ECOMMERCE_MANAGEMENT_CREATE}
              className={buttonVariants({ variant: 'default' })}
            >
              <PlusCircle className="mr-2 size-4" />
              Publicar ecommerce
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
