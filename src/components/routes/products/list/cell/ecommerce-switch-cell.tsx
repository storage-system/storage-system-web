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
        className="transition-all duration-200 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-muted"
        onCheckedChange={(checked) => {
          setUpdateList((prev) => {
            const shouldKeepDefault = checked === isInitiallyActive

            return shouldKeepDefault
              ? prev.filter((item) => item.id !== productId)
              : [
                  ...prev.filter((item) => item.id !== productId),
                  {
                    id: productId,
                    action: checked ? 'add' : 'remove',
                  },
                ]
          })
        }}
      />
    )
  },
)

EcommerceSwitchCell.displayName = 'EcommerceSwitchCell'
