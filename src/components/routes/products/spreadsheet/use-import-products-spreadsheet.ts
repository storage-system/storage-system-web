import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useProductsService } from '@/services/product'

export const useSpreadsheetImporter = () => {
  const [productsData, setProductsData] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

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

  const transformSpreadsheetData = (data: any[]) => {
    return data.map((item) => ({
      unit: item.Unidade,
      name: item.Nome,
      description: item['Descrição'],
      manufacturingDate: item['Data de Fabricação'],
      expirationDate: item['Data de Validade'],
      weight: item.Peso,
      originalPrice: item['Preço Original'],
      finalPrice: item['Preço Final'],
      quantity: item.Quantidade,
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
      const transformedData = transformSpreadsheetData(rawData)
      setProductsData(transformedData)
    } catch (error) {
      toast({
        title:
          'Erro ao importar a planilha. Verifique o arquivo e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return {
    productsData,
    fileInputRef,
    handleFileChange,
    getTemplate,
    isGetTemplatePending,
  }
}
