import {
  CurrentStep,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'

import { Paintbrush } from 'lucide-react'
import { HeroImages } from './steps/hero-images'
import { CustomStyle } from './steps/styles-colors'
import { StylesInitialStep } from './steps/ecommerce-management-initial-step'

export function SidebarContent() {
  const { currentStep } = useEcommerceManagement()

  return (
    <div className="flex h-[calc(100vh-4rem)]">
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
    case CurrentStep.HERO_IMAGES:
      return <HeroImages />
    case CurrentStep.BENEFITS_SECTION:
      return <HeroImages />
    case CurrentStep.CUSTOM_THEME:
      return <CustomStyle />
  }
}
