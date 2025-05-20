import { Button } from '@/components/ui/button'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { CurrentStep, useEcommerceManagement } from '@/providers/ecommerce-management-provider'

import { ChevronLeft, List } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const { currentStep, setCurrentStep } = useEcommerceManagement()

  function handleNavigate() {
    switch (currentStep) {
      case CurrentStep.INITIAL: {
        router.push(PrivateRoutes.ECOMMERCE_MANAGEMENT)
        break
      }
      default: {
        setCurrentStep(CurrentStep.INITIAL)
      }
    }
  }

  return (
    <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-input bg-accent">
      <div className="flex">
        <button
          type="button"
          className="flex w-[100px] justify-center"
          onClick={handleNavigate}
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center space-x-2 border-x-2 border-gray-100 px-2">
          <List className="size-5" />
          <p>Guia de edição</p>
        </div>
      </div>
      <div className="mr-5 flex h-full items-center justify-center">
        <Button variant={'ghost'}>Vizualizar</Button>
        <Button className="flex items-center bg-primary px-4 text-white dark:text-black">
          Salvar
        </Button>
      </div>
    </header>
  )
}
