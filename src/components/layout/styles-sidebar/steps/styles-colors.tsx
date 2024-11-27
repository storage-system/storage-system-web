import { useStyles } from '@/providers/style-provider'
import 'react-color-palette/css'
import { ColorPickerWithLabel } from './color-picker-with-label'

export function StylesColors() {
  const { colors, setColors } = useStyles()

  return (
    <div className="flex flex-col gap-6">
      {colors.map((color) => (
        <ColorPickerWithLabel
          key={color.colorId}
          title={color.title}
          description={color.description}
          currentColor={color}
          onChange={(newColor) =>
            setColors((prevColors) =>
              prevColors.map((oolor) =>
                oolor.colorId === color.colorId
                  ? { ...oolor, ...newColor }
                  : oolor,
              ),
            )
          }
        />
      ))}
    </div>
  )
}
