import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { IColor as ColorType } from 'react-color-palette'

export enum CurrentStep {
  INITIAL = 'initial',
  SITE_STYLE = 'site-style',
}

interface IColor extends ColorType {
  colorId: string
  description: string
  title: string
}

interface StylesContext {
  currentStep: CurrentStep
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>
  colors: IColor[]
  setColors: Dispatch<SetStateAction<IColor[]>>
}

export const StylesContext = createContext<StylesContext | null>(null)

interface StylesProviderProps {
  initialColorConfig: IColor[]
  children: ReactNode
}

export function StylesProvider({
  children,
  initialColorConfig = [],
}: StylesProviderProps) {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.INITIAL,
  )

  const [colors, setColors] = useState<IColor[]>(initialColorConfig)

  return (
    <StylesContext.Provider
      value={{ currentStep, setCurrentStep, colors, setColors }}
    >
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
