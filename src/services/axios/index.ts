import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { ApplicationError } from '@/utils/application-error'
import { getSession } from 'next-auth/react'
import { type paths } from '@/@types/openapi'

type AxiosRequestConfigWithRouteParams<D> = AxiosRequestConfig<D> & {
  routeParams?: Record<string, string>
}

export interface ApiResponseError {
  statusCode: number
  message: string
  errors: string[]
}

class Rest {
  private instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  private applyRouteParams(url: string, routeParams?: Record<string, string>) {
    if (!routeParams) {
      return url
    }

    return Object.entries(routeParams).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, value),
      url,
    )
  }

  get<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.get(this.applyRouteParams(url, routeParams), others)
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.post(
      this.applyRouteParams(url, routeParams),
      data,
      others,
    )
  }

  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.postForm(
      this.applyRouteParams(url, routeParams),
      data,
      others,
    )
  }

  put<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.put(
      this.applyRouteParams(url, routeParams),
      data,
      others,
    )
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    data?: D,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.patch(
      this.applyRouteParams(url, routeParams),
      data,
      others,
    )
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: keyof paths,
    config?: AxiosRequestConfigWithRouteParams<D>,
  ): Promise<R> {
    const { routeParams, ...others } = config ?? {}

    return this.instance.delete(this.applyRouteParams(url, routeParams), others)
  }

  get axios() {
    return this.instance
  }
}

export const storageSystemApi = new Rest({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
})

storageSystemApi.axios.interceptors.request.use(async (request) => {
  const session = await getSession()
  if (session) {
    request.headers.Authorization = `Bearer ${session.user.access_token}`
  }
  return request
})

storageSystemApi.axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError<ApiResponseError>) => {
    throw new ApplicationError(error)
  },
)
