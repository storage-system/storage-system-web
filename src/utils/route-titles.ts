import { PrivateRoutes } from '@/constants/routes/private-routes'

export type RouteTitles = {
  [key in PrivateRoutes]: string
}

export const routeTitles: RouteTitles = {
  [PrivateRoutes.HOME]: 'Início',
  [PrivateRoutes.CATEGORY]: 'Categorias',
  [PrivateRoutes.COMPANY]: 'Empresa',
  [PrivateRoutes.PROFILE]: 'Perfil',
  [PrivateRoutes.PRODUCT]: 'Produto',
  [PrivateRoutes.CREATE_PRODUCT]: 'Criação de produto',
  [PrivateRoutes.CONFIGURATIONS]: 'Configurações',
  [PrivateRoutes.UPDATE_STYLES]: 'Atualização de estilos',
  [PrivateRoutes.MANAGE_STOCK]: 'Gerenciar estoque',
  [PrivateRoutes.ECOMMERCE_MANAGEMENT]: 'Gerenciar e-commerce',
  [PrivateRoutes.ECOMMERCE_MANAGEMENT_CREATE]: 'Criar e-commerce',
  [PrivateRoutes.ECOMMERCE_MANAGEMENT_UPDATE]: 'Atualizar e-commerce',
}
