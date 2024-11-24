import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export enum CurrentStep {
  INITIAL = 'initial',
  SITE_STYLE = 'site-style',
}

interface IColor {
  hex: string
  rgb: { r: number; g: number; b: number; a: number }
  hsv: { h: number; s: number; v: number; a: number }
}

interface StylesContext {
  step: CurrentStep
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>
  colors: {
    primary: IColor
    secondary: IColor
    highlight: IColor
  }
  setColors: Dispatch<
    SetStateAction<{
      primary: IColor
      secondary: IColor
      highlight: IColor
    }>
  >
}

export const StylesContext = createContext<StylesContext | null>(null)

interface StylesProviderProps {
  children: ReactNode
}

export function StylesProvider({ children }: StylesProviderProps) {
  const [step, setCurrentStep] = useState<CurrentStep>(CurrentStep.INITIAL)

  const [colors, setColors] = useState({
    primary: {
      hex: '#3b82f6e8',
      rgb: { r: 59, g: 130, b: 246, a: 100 },
      hsv: { h: 212, s: 76, v: 96, a: 100 },
    },
    secondary: {
      hex: '#f97316e8',
      rgb: { r: 249, g: 115, b: 22, a: 100 },
      hsv: { h: 24, s: 91, v: 98, a: 100 },
    },
    highlight: {
      hex: '#10b981e8',
      rgb: { r: 16, g: 185, b: 129, a: 100 },
      hsv: { h: 160, s: 91, v: 73, a: 100 },
    },
  })

  return (
    <StylesContext.Provider value={{ step, setCurrentStep, colors, setColors }}>
      {children}
    </StylesContext.Provider>
  )
}

export function useStyles(): StylesContext {
  const context = useContext(StylesContext)
  if (!context) {
    throw new Error('useStyles must be used within a StylesProvider.')
  }
  return context
}
