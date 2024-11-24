import { CurrentStep, useStyles } from '@/providers/style-provider'
import { StylesInitialStep } from './steps/styles-initial-step'
import { StylesColors } from './steps/styles-colors'

export function SidebarContent() {
  const { step } = useStyles()

  switch (step) {
    case CurrentStep.INITIAL:
      return <StylesInitialStep />
    case CurrentStep.SITE_STYLE:
      return <StylesColors />
  }
}
