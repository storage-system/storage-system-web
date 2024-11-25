import { PrivateRoutes } from '@/constants/routes/private-routes'
import { CurrentStep, useStyles } from '@/providers/style-provider'
import { ChevronLeft, List } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const { setCurrentStep, currentStep } = useStyles()

  function handleNavigate() {
    if (currentStep === CurrentStep.SITE_STYLE) {
      return setCurrentStep(CurrentStep.INITIAL)
    }

    if (currentStep === CurrentStep.INITIAL) {
      router.push(PrivateRoutes.STYLES)
    }
  }

  return (
    <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-white shadow-md">
      <div className="flex">
        <button
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
      <div className="h-full">
        <button className="flex h-full items-center bg-primary px-4 text-white transition-all duration-200 active:scale-95 ">
          <p>Publicar</p>
        </button>
      </div>
    </header>
  )
}
