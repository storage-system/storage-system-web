import { CurrentStep, useStyles } from '@/providers/style-provider'
import { ChevronLeft, List } from 'lucide-react'

export function Header() {
  const { setCurrentStep } = useStyles()

  return (
    <header className="fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-white shadow-md">
      <div className="flex">
        <button
          className="flex w-[100px] justify-center"
          onClick={() => setCurrentStep(CurrentStep.INITIAL)}
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center border-x-2 border-gray-100 px-2">
          <List />
          <p>Guia de edição</p>
        </div>
      </div>
      <div className="h-full">
        <button className="flex h-full items-center bg-primary px-4 text-white transition-all duration-200 active:scale-95 ">
          <p>Publicar Ecommerce</p>
        </button>
      </div>
    </header>
  )
}
