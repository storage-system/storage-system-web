import { ListCategory } from "@/@types/category";
import { TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCategoriesService } from "@/services/categories";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@/utils/query-client";
import { categoriesQueryKey } from "@/constants/query-key/categories-query-key";

interface Props {
  row: ListCategory
}

export function DeleteCategoryCell({ row }: Props) {
  const [openDialog, setOpenDialog] = useState(false)

  const { deleteCategoryService } = useCategoriesService()

  async function handleDeleteCell() {
    await deleteCategoryService(row.id)
  }

  async function handleSuccess() {
    await queryClient.invalidateQueries({
      queryKey: [categoriesQueryKey.LIST_CATEGORIES],
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
          <TooltipContent>
            Deletar
          </TooltipContent>
        </TooltipRoot>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center">
          <AlertCircle className="size-5 mr-2" />
          Tem certeza que deseja excluir esta categoria?
        </div>
        <div className="flex justify-end gap-4">
          <DialogClose>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={() => mutateAsync()}>Excluir</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}