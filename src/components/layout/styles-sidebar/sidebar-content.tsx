import { CurrentStep, useStyles } from '@/providers/style-provider'
import { StylesInitialStep } from './steps/styles-initial-step'
import { CustomStyle } from './steps/styles-colors'
import { Paintbrush } from 'lucide-react'

export function SidebarContent() {
  const { currentStep } = useStyles()

  return (
    <div className="flex h-full">
      <div className="flex h-full w-[50px] flex-col border-r border-input">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex size-[50px] items-center justify-center"
          >
            <button className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary transition-all duration-300 hover:scale-105">
              <Paintbrush />
            </button>
          </div>
        ))}
      </div>
      <RenderStep currentStep={currentStep} />
    </div>
  )
}

function RenderStep({ currentStep }: { currentStep: CurrentStep }) {
  switch (currentStep) {
    case CurrentStep.INITIAL:
      return <StylesInitialStep />
    case CurrentStep.CUSTOM_THEME:
      return <CustomStyle />
  }
}
