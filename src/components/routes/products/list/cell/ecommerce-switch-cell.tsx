import { Dispatch, memo, SetStateAction, useMemo } from 'react'
import { Switch } from '@/components/ui/switch'
import { UpdateEcommerceProductsDTO } from '@/@types/ecommerce/ecommerce-management'

interface EcommerceSwitchCellProps {
  productId: string
  ecommerceId?: string | null
  updateList: UpdateEcommerceProductsDTO[]
  setUpdateList: Dispatch<SetStateAction<UpdateEcommerceProductsDTO[]>>
}

export const EcommerceSwitchCell = memo(
  ({
    productId,
    ecommerceId,
    updateList,
    setUpdateList,
  }: EcommerceSwitchCellProps) => {
    const isInitiallyActive = Boolean(ecommerceId)

    const isOverridden = updateList.find((item) => item.id === productId)

    const isChecked = useMemo(() => {
      if (isOverridden?.action === 'add') return true
      if (isOverridden?.action === 'remove') return false
      return isInitiallyActive
    }, [isInitiallyActive, isOverridden])

    return (
      <Switch
        checked={isChecked}
        onCheckedChange={(checked) => {
          setUpdateList((prev) => {
            const existing = prev.find((item) => item.id === productId)

            // Caso já esteja no estado
            if (existing) {
              // Se o valor do switch voltou ao estado inicial, removemos da lista
              const shouldRemove =
                (checked && isInitiallyActive) ||
                (!checked && !isInitiallyActive)

              if (shouldRemove) {
                return prev.filter((item) => item.id !== productId)
              }

              // Caso contrário, mantemos como está
              return prev
            }

            // Caso não esteja no estado e houve mudança
            if (checked !== isInitiallyActive) {
              return [
                ...prev,
                {
                  id: productId,
                  action: checked ? 'add' : 'remove',
                },
              ]
            }

            return prev
          })
        }}
      />
    )
  },
)

EcommerceSwitchCell.displayName = 'EcommerceSwitchCell'
