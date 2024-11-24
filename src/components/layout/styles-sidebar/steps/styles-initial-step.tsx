import { CurrentStep, useStyles } from '@/providers/style-provider'
import { Brush, ChevronRight } from 'lucide-react'

export function StylesInitialStep() {
  const { setCurrentStep } = useStyles()

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-gray-400">Comece por aqui</p>
      <div className="flex w-full flex-col gap-2">
        <button
          className="flex gap-4 p-2"
          onClick={() => setCurrentStep(CurrentStep.SITE_STYLE)}
        >
          <Brush /> <span className="flex-1 text-start">Estilo do site</span>{' '}
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
