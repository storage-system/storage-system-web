import {
  Popover,
  PopoverTrigger,
  PopoverContent,
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
    <div className="flex flex-col gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-4">
            <div
              className="size-10 rounded-full ring-2 ring-input"
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
      <p className="text-gray-600 opacity-80">{description}</p>
    </div>
  )
}
