import { components } from './openapi'

export type Category =
  components['schemas']['HttpCategoryListResponse']['items'][number]

export type ListCategory = components['schemas']['HttpCategoryListResponse']
