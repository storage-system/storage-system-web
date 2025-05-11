import { FormField } from '@/components/ui/form'
import { highlightedThemes } from '@/constants/styles/highlighted-themes'
import { initialColorConfig } from '@/constants/styles/initial-color-config'
import { CurrentStep, Theme, useStyles } from '@/providers/style-provider'
import { FormMessage } from '@/shared/form/form-message'
import { StyleCard } from './style-card'

export function StylesInitialStep() {
  const { setCurrentStep, setTheme, form } = useStyles()

  function handleThemeSelection(theme: Theme) {
    setTheme(theme)
    const themeColors = theme.paletteColors.reduce((acc: any, colorMap) => {
      Object.entries(colorMap).forEach(([key, value]) => {
        switch (key) {
          case 'backgroundColor':
            acc.backgroundColor = value.hex
            break
          case 'textColor':
            acc.textColor = value.hex
            break
          case 'primaryColor':
            acc.primaryColor = value.hex
            break
          case 'secondaryColor':
            acc.secondaryColor = value.hex
            break
          case 'tertiaryColor':
            acc.tertiaryColor = value.hex
            break
          default:
            break
        }
      })
      return acc
    }, {})

    form.reset({
      isActive: true,
      name: theme.title,
      ...themeColors,
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 py-[14px] pl-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="flex-1">
              <input
                autoComplete="off"
                className="w-full text-xl text-primary outline-none"
                placeholder="Nome da loja"
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />
      </div>
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize o design da sua loja</p>
      </div>

      <div className="m-3 flex flex-col gap-4">
        <p className="text-[10px] uppercase text-textPrimary">Tema atual</p>
        <StyleCard
          onClick={() => {
            setTheme(initialColorConfig)
            setCurrentStep(CurrentStep.CUSTOM_THEME)
          }}
          className="border-primary"
          title="Tema personalizado"
          description="Este tema é usado em todo o site."
          paletteColors={['#FFFFFF', '#CCCCCC', '#888888', '#444444']}
        />
      </div>

      <div className="m-3 flex flex-col gap-4">
        <p className="text-[10px] uppercase text-textPrimary">
          Temas em destaque
        </p>
        {highlightedThemes.map((theme, index) => (
          <StyleCard
            key={index}
            title={theme.title}
            description={theme.description}
            paletteColors={theme.paletteColors
              .flatMap((colorMap) =>
                Object.values(colorMap).map((color) => color.hex),
              )
              .splice(0, 4)}
            onClick={() => {
              handleThemeSelection(theme)
            }}
          />
        ))}
      </div>
    </div>
  )
}
