import * as XLSX from 'xlsx'
import { CreateProductInput } from '@/validations/create-product-schema'
import { storageSystemApi } from '../axios'
import { Pagination } from '@/@types/pagination'
import { AxiosRequestConfig } from 'axios'
import { ListProduct, Product } from '@/@types/product'
import { UpdateProductOutput } from '@/validations/update-product-schema'

export function useProductsService() {
  async function createProductService(anInput: CreateProductInput) {
    return await storageSystemApi.post('/api/products', anInput)
  }

  async function listProductsService(
    companyId: string,
    params?: AxiosRequestConfig,
  ): Promise<Pagination<ListProduct>> {
    const { data } = await storageSystemApi.get(
      `/api/products/company/{companyId}`,
      { routeParams: { companyId }, params },
    )
    return data
  }

  async function getProductByIdService(anId: string): Promise<Product> {
    const { data } = await storageSystemApi.get('/api/products/{id}', {
      routeParams: { id: anId },
    })

    return data
  }

  async function updateProductService(anInput: UpdateProductOutput) {
    return await storageSystemApi.patch('/api/products/{id}', anInput)
  }

  async function deleteProductService(anId: string) {
    return await storageSystemApi.delete(`/api/products/{id}`, {
      routeParams: { id: anId },
    })
  }

  async function getProductsTemplate() {
    const response = await storageSystemApi.get('/api/products/template', {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'modelo_produtos.xlsx'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  async function readSpreadsheetProducts(file: File): Promise<any[]> {
    const reader = new FileReader()

    return new Promise((resolve) => {
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        resolve(parsedData)
      }

      reader.readAsArrayBuffer(file)
    })
  }

  return {
    createProductService,
    listProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService,
    getProductsTemplate,
    readSpreadsheetProducts,
  }
}
