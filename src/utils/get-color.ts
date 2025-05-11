import { ColorIdEnum, Theme } from '@/providers/style-provider'

export const getColorById = (colors: Theme, colorId: ColorIdEnum) => {
  const colorObject = colors?.paletteColors?.find(
    (color) => Object.keys(color)[0] === colorId,
  )

  return colorObject ? Object.values(colorObject)[0].hex : 'transparent'
}
