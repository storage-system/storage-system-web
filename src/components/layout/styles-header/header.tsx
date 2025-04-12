import { Button } from '@/components/ui/button'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { CurrentStep, useStyles } from '@/providers/style-provider'
import { ChevronLeft, List, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const { currentStep, setCurrentStep, isPending } = useStyles()

  function handleNavigate() {
    if (currentStep === CurrentStep.CUSTOM_THEME) {
      return setCurrentStep(CurrentStep.INITIAL)
    }

    if (currentStep === CurrentStep.INITIAL) {
      router.push(PrivateRoutes.STYLES)
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
        <Button disabled={isPending} variant={'ghost'}>
          Vizualizar
        </Button>
        <Button
          disabled={isPending}
          className="flex w-[80px] items-center bg-primary px-4 text-white dark:text-black"
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Salvar'}
        </Button>
      </div>
    </header>
  )
}
