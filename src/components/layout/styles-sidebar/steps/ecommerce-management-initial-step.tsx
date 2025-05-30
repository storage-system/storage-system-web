import {
  ColorIdEnum,
  CurrentStep,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'
import { cn } from '@/utils/class-name'
import { StyleCard } from './style-card'
import { FormField } from '@/components/ui/form'
import { FormMessage } from '@/shared/form/form-message'
import { predefinedThemes } from '@/constants/styles/predefined-themes'

export function StylesInitialStep() {
  const { setCurrentStep, initialForm, createStyleForm, setColors } =
    useEcommerceManagement()

  return (
    <div className="flex max-h-screen flex-col overflow-y-auto">
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize o design do seu site</p>
      </div>

      <div className="m-3 flex flex-col gap-4">
        <FormField
          control={initialForm.control}
          name="name"
          render={({ field }) => (
            <div className="flex-1">
              <input
                autoComplete="off"
                className="w-full text-xl text-primary outline-none"
                placeholder="Nome do ecommerce"
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />
        <p className="text-[10px] uppercase text-textPrimary">
          Conteúdos do carrossel
        </p>
        <div
          className={cn(
            'hover:cursor-pointer hover:scale-[101%] hover:bg-gray-50 dark:hover:bg-gray-50/10 transition-all duration-100 flex items-center justify-between overflow-hidden rounded-sm border border-gray-200 px-3',
          )}
          onClick={() => setCurrentStep(CurrentStep.HERO_IMAGES)}
        >
          <div className="flex flex-col py-[14px]">
            <p className="text-[14px] font-medium">Personalizar Carrossel</p>
            <p className="text-xs">Personalise aqui as imagens do carrossel</p>
          </div>
        </div>
      </div>
      <div className="m-3 flex flex-col gap-4">
        <p className="text-[10px] uppercase text-textPrimary">
          Conteúdos da seção de benefícios
        </p>
        <div
          className={cn(
            'hover:cursor-pointer hover:scale-[101%] hover:bg-gray-50 dark:hover:bg-gray-50/10 transition-all duration-100 flex items-center justify-between overflow-hidden rounded-sm border border-gray-200 px-3',
          )}
          onClick={() => setCurrentStep(CurrentStep.BENEFITS_SECTION)}
        >
          <div className="flex flex-col py-[14px]">
            <p className="text-[14px] font-medium">
              Personalizar Seção de beneficios
            </p>
            <p className="text-xs">Personalise a seção de beneficios</p>
          </div>
        </div>
      </div>
      <div className="m-3 flex flex-col gap-4">
        <p className="text-[10px] uppercase text-textPrimary">Tema atual</p>
        <StyleCard
          onClick={() => setCurrentStep(CurrentStep.CUSTOM_THEME)}
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
        {predefinedThemes.map((theme, index) => (
          <StyleCard
            key={index}
            title={theme.name}
            description={theme.description}
            paletteColors={theme.colors.map((c) => c.hex).slice(0, 4)}
            onClick={() => {
              setColors(theme.colors)
              const background = theme.colors.find(
                (c) => c.colorId === ColorIdEnum.BACKGROUND_COLOR,
              )?.hex
              const text = theme.colors.find(
                (c) => c.colorId === ColorIdEnum.TEXT_COLOR,
              )?.hex
              const primary = theme.colors.find(
                (c) => c.colorId === ColorIdEnum.PRIMARY_COLOR,
              )?.hex
              const secondary = theme.colors.find(
                (c) => c.colorId === ColorIdEnum.SECONDARY_COLOR,
              )?.hex
              const tertiary = theme.colors.find(
                (c) => c.colorId === ColorIdEnum.TERTIARY_COLOR,
              )?.hex

              createStyleForm.reset({
                name: theme.name,
                isActive: false,
                backgroundColor: background ?? '',
                textColor: text ?? '',
                primaryColor: primary ?? '',
                secondaryColor: secondary ?? '',
                tertiaryColor: tertiary ?? '',
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
