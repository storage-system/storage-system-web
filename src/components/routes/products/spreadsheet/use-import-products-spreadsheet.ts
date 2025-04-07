import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useProductsService } from '@/services/product'
import { CreateProductType } from '@/validations/create-product-schema'
import { SpreadsheetProductRow } from '@/@types/product/spreadsheet-product-row'
import { StatusProduct } from '@/@types/status-product'
import { useSession } from 'next-auth/react'

export const useSpreadsheetImporter = () => {
  const [openModal, setOpenModal] = useState(false)
  const [productsData, setProductsData] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { data } = useSession()

  const { getProductsTemplate } = useProductsService()

  const { mutateAsync: getTemplate, isPending: isGetTemplatePending } =
    useMutation({
      mutationFn: getProductsTemplate,
    })

  const readSpreadsheetProducts = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsedData = XLSX.utils.sheet_to_json(sheet)
          resolve(parsedData)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'))
      reader.readAsArrayBuffer(file)
    })
  }

  const transformSpreadsheetData = (
    data: SpreadsheetProductRow[],
    companyId: string,
  ): CreateProductType[] => {
    return data.map((product) => ({
      name: product.Nome,
      description: product['Descrição'],
      originalPrice: Number(product['Preço Original']),
      finalPrice: Number(product['Preço Final']),
      discountPercentage: Number(product['Porcentagem de desconto']),
      quantityInStock: parseInt(product['Quantidade em estoque'], 10),
      minimumStock: parseInt(product['Quantidade mínima de estoque'], 10),
      manufactureDate: product['Data de Fabricação']
        ? new Date(product['Data de Fabricação'])
        : undefined,
      validityInDays: Number(product['Validade em dias']),
      unitOfMeasure: product.Unidade,
      weight: Number(product.Peso),
      height: product.Altura,
      width: product.Largura,
      depth: product.Profundidade,
      manufacturer: product.Fabricante || undefined,
      batch: product.Lote || undefined,
      status: StatusProduct.ACTIVE,
      companyId,
      categoryIds: product.Categoria ? [product.Categoria] : [],
    }))
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (!/\.(xls|xlsx|csv)$/i.test(selectedFile.name)) {
      toast({
        title: 'Apenas arquivos Excel (.xls, .xlsx, .csv) são permitidos.',
        variant: 'default',
      })
      return
    }

    try {
      const rawData = await readSpreadsheetProducts(selectedFile)
      const transformedData = transformSpreadsheetData(
        rawData,
        data?.user.companyId ?? '',
      )
      setProductsData(transformedData)
    } catch (error) {
      toast({
        title:
          'Erro ao importar a planilha. Verifique o arquivo e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setProductsData([])
  }

  return {
    productsData,
    fileInputRef,
    handleFileChange,
    getTemplate,
    isGetTemplatePending,
    handleCloseModal,
    openModal,
    setOpenModal,
  }
}
