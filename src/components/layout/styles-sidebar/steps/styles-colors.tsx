import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useStyles } from '@/providers/style-provider'
import { ColorPicker, IColor } from 'react-color-palette'
import 'react-color-palette/css'

export function StylesColors() {
  const { colors, setColors } = useStyles()

  return (
    <div className="flex flex-col gap-6">
      <ColorPickerWithLabel
        title="Cor principal"
        description="Aparece nos botões, no preço do produto e nos textos do rodapé."
        colorKey="primary"
        currentColor={colors.primary}
        onChange={(newColor) =>
          setColors((prevColors) => ({ ...prevColors, primary: newColor }))
        }
      />
      <ColorPickerWithLabel
        title="Cor secundária"
        description="Aparece na barra de anúncio."
        colorKey="secondary"
        currentColor={colors.secondary}
        onChange={(newColor) =>
          setColors((prevColors) => ({ ...prevColors, secondary: newColor }))
        }
      />
      <ColorPickerWithLabel
        title="Cor de destaque"
        description="Aparece nas promoções e nas mensagens de desconto, frete grátis e parcelamento sem juros."
        colorKey="highlight"
        currentColor={colors.highlight}
        onChange={(newColor) =>
          setColors((prevColors) => ({ ...prevColors, highlight: newColor }))
        }
      />
    </div>
  )
}

interface ColorPickerWithLabelProps {
  title: string
  description: string
  colorKey: string
  currentColor: IColor
  onChange: (newColor: IColor) => void
}

export function ColorPickerWithLabel({
  title,
  description,
  currentColor,
  onChange,
}: ColorPickerWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-4">
            <div
              className="size-10 rounded-full"
              style={{
                backgroundColor: currentColor.hex,
              }}
            />
            <p className="font-medium">{title}</p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <ColorPicker
            color={currentColor}
            onChange={(newColor) => {
              onChange(newColor)
            }}
          />
        </PopoverContent>
      </Popover>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
