import { ListCategory } from "@/@types/category"
import { Switch } from "@/components/ui/switch"
import { categoriesQueryKey } from "@/constants/query-key/categories-query-key"
import { useCategoriesService } from "@/services/categories"
import { queryClient } from "@/utils/query-client"
import { useMutation } from "@tanstack/react-query"

interface Props {
  row: ListCategory
}

export function CategoryActiveCell({ row }: Props) {
  const { updateCategoryService } = useCategoriesService()

  async function handleUpdateActiveCell(open: boolean) {
    await updateCategoryService(row.id, {
      isActive: open,
    })
  }

  const { mutateAsync, isPending } = useMutation({
    mutationFn: handleUpdateActiveCell,
    onSuccess: (async () => {
      await queryClient.invalidateQueries({
        queryKey: [categoriesQueryKey.LIST_CATEGORIES],
      })
    })
  })

  return (
    <Switch
      defaultChecked={row.isActive}
      onCheckedChange={mutateAsync}
      disabled={isPending}
    />
  )
}