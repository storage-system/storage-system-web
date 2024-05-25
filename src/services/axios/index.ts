import axios from 'axios'

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

  return instance
}

export const storageSystemApi = ApiCLient()
