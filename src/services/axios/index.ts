import { ApplicationError } from '@/utils/application-error'
import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'

export interface ApiResponseError {
  statusCode: number
  message: string
  errors: string[]
}

const ApiCLient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_STORAGE_SYSTEM_API_URL,
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use(async (request) => {
    const session = await getSession()
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.access_token}`
    }
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<ApiResponseError>) => {
      throw new ApplicationError(error)
    },
  )

  return instance
}

export const storageSystemApi = ApiCLient()
