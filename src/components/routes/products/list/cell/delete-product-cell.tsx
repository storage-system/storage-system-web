import { ListProduct } from '@/@types/product'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog'
import { AlertCircle, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { queryClient } from '@/utils/query-client'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { useProductsService } from '@/services/product'

interface Props {
  row: ListProduct
}

export function DeleteProductCell({ row }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  const { deleteProductService } = useProductsService()

  async function handleDeleteCell() {
    await deleteProductService(row.id)
  }

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [productsQueryKey.LIST_PRODUCTS],
    })
    setOpenDialog(false)
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleDeleteCell,
    onSuccess: handleSuccess,
  })

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <TooltipRoot>
          <TooltipTrigger>
            <Trash2 className="size-4 text-red-500" />
          </TooltipTrigger>
          <TooltipContent>Deletar</TooltipContent>
        </TooltipRoot>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center">
          <AlertCircle className="mr-2 size-5" />
          Tem certeza que deseja excluir o produto {row.name}?
        </div>
        <div className="flex justify-end gap-4">
          <DialogClose>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={() => mutateAsync()}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
