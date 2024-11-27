import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ColorPicker, IColor } from 'react-color-palette'

interface ColorPickerWithLabelProps {
  title: string
  description: string
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
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2">
            <div
              className="size-6 rounded-sm ring-1 ring-input"
              style={{
                backgroundColor: currentColor.hex,
              }}
            />
            <p className="font-medium">{title}</p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <ColorPicker color={currentColor} onChange={onChange} />
        </PopoverContent>
      </Popover>
      <p className="text-sm text-foreground opacity-80">{description}</p>
    </div>
  )
}
