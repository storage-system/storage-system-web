import { components } from '@/@types/openapi'
import { storageSystemApi } from '@/services/axios'

export type RetrieveEcommerceDTO = components['schemas']['RetrieveEcommerceDTO']

export async function getEcommerceDetails(
  slug: string,
): Promise<RetrieveEcommerceDTO> {
  const { data } = await storageSystemApi.get<RetrieveEcommerceDTO>(
    '/api/ecommerce/{slug}',
    {
      routeParams: { slug },
    },
  )

  return data
}

export type GetEcommerceProductDTO =
  components['schemas']['GetEcommerceProductDTO']

export async function getEcommerceProduct(
  slug: string,
  productId: string,
): Promise<GetEcommerceProductDTO> {
  const { data } = await storageSystemApi.get<GetEcommerceProductDTO>(
    '/api/ecommerce/{slug}/products/{productId}',
    {
      routeParams: {
        slug,
        productId,
      },
    },
  )

  return data
}
