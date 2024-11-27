import { CurrentStep, useStyles } from '@/providers/style-provider'
import { cn } from '@/utils/class-name'
import { StyleCard } from './style-card'

// Temas destacados e cores correspondentes
const highlightedThemes = [
  {
    title: 'Energética',
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
  const { setCurrentStep } = useStyles()

  return (
    <div className="flex flex-col">
      <div className="gap-4 border-b border-input py-[14px] pl-3">
        <p className="font-medium">Personalize o design do seu site</p>
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
