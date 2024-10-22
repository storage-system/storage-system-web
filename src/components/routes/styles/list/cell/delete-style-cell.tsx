import { ListEachStyle, ListStyle } from '@/@types/style'
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
import { stylesQueryKey } from '@/constants/query-key/styles-query-key'
import { useStylesService } from '@/services/styles'

interface Props {
  row: ListEachStyle
}

export function DeleteStyleCell({ row }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  const { deleteStyleService } = useStylesService()

  async function handleDeleteCell() {
    await deleteStyleService(row.id)
  }

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [stylesQueryKey.LIST_STYLES],
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
            <Trash2 className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Deletar</TooltipContent>
        </TooltipRoot>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center">
          <AlertCircle className="mr-2 size-5" />
          Tem certeza que deseja excluir este produto?
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
