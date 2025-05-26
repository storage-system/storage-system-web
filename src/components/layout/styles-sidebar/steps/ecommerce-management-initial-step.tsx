import {
  CurrentStep,
  useEcommerceManagement,
} from '@/providers/ecommerce-management-provider'
import { cn } from '@/utils/class-name'
import { StyleCard } from './style-card'
import { FormField } from '@/components/ui/form'
import { FormMessage } from '@/shared/form/form-message'

const highlightedThemes = [
  {
    title: 'Enérgica',
    description: 'Vibrante e alegre',
    paletteColors: ['#0000FF', '#FFC0CB', '#FF69B4', '#C71585'],
  },
  {
    title: 'Retrô',
    description: 'Nostálgico e estiloso',
    paletteColors: ['#008080', '#FFD700', '#FF6347', '#DC143C'],
  },
  {
    title: 'Dinâmico',
    description: 'Ativo e brilhante',
    paletteColors: ['#FFFF00', '#FF00FF', '#8A2BE2', '#4B0082'],
  },
  {
    title: 'Nostálgico',
    description: 'Aconchegante e confortável',
    paletteColors: ['#8B0000', '#FFE4E1', '#4682B4', '#D3D3D3'],
  },
]

export function StylesInitialStep() {
  const { setCurrentStep, initialForm } = useEcommerceManagement()

  return (
    <div className="flex flex-col max-h-screen overflow-y-auto">
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
        {highlightedThemes.map((theme, index) => (
          <StyleCard
            key={index}
            title={theme.title}
            description={theme.description}
            paletteColors={theme.paletteColors}
          />
        ))}
      </div>
    </div>
  )
}
