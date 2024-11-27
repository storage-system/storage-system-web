import { CurrentStep, useStyles } from '@/providers/style-provider'
import { Brush, ChevronRight } from 'lucide-react'

export function StylesInitialStep() {
  const { setCurrentStep } = useStyles()

  return (
    <div className="flex flex-col gap-4 border-b p-3 ">
      <div>Personalize o design do seu site</div>
      <div className="flex w-full flex-col gap-2">
        <button
          className="flex gap-4 p-2"
          onClick={() => setCurrentStep(CurrentStep.INITIAL)}
        >
          <Brush /> <span className="flex-1 text-start">Estilo do site</span>{' '}
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}
