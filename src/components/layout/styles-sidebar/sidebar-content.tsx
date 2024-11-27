import { CurrentStep, useStyles } from '@/providers/style-provider'
import { StylesInitialStep } from './steps/styles-initial-step'
import { StylesColors } from './steps/styles-colors'

export function SidebarContent() {
  const { currentStep } = useStyles()

  switch (currentStep) {
    case CurrentStep.INITIAL:
      return <StylesInitialStep />
    case CurrentStep.CUSTOM_THEME:
      return <StylesColors />
  }
}
