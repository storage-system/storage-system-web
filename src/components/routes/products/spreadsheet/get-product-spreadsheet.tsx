'use client'

import { Button } from '@/components/ui/button'
import { useProductsService } from '@/services/product'
import { useMutation } from '@tanstack/react-query'

export function GetProdutSpreadsheet() {
  const { getProductsTemplate } = useProductsService()

  const { mutateAsync: getTemplate, isPending } = useMutation({
    mutationFn: getProductsTemplate,
  })

  return (
    <Button
      isLoading={isPending}
      disabled={isPending}
      onClick={() => getTemplate()}
      variant="outline"
    >
      Baixar Modelo Excel
    </Button>
  )
}
