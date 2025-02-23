import { ColorIdEnum, Theme } from '@/providers/style-provider'

export const highlightedThemes: Theme[] = [
  {
    title: 'Enérgica',
    description: 'Vibrante e alegre',
    paletteColors: [
      {
        [ColorIdEnum.BACKGROUND_COLOR]: {
          hex: '#0000FF',
          hsv: { h: 240, s: 100, v: 100, a: 1 },
          rgb: { r: 0, g: 0, b: 255, a: 1 },
        },
      },
      {
        [ColorIdEnum.PRIMARY_COLOR]: {
          hex: '#FFC0CB',
          hsv: { h: 350, s: 25, v: 100, a: 1 },
          rgb: { r: 255, g: 192, b: 203, a: 1 },
        },
      },
      {
        [ColorIdEnum.SECONDARY_COLOR]: {
          hex: '#FF69B4',
          hsv: { h: 330, s: 59, v: 100, a: 1 },
          rgb: { r: 255, g: 105, b: 180, a: 1 },
        },
      },
      {
        [ColorIdEnum.TERTIARY_COLOR]: {
          hex: '#C71585',
          hsv: { h: 322, s: 89, v: 78, a: 1 },
          rgb: { r: 199, g: 21, b: 133, a: 1 },
        },
      },
      {
        [ColorIdEnum.TEXT_COLOR]: {
          hex: '#FFFFFF',
          hsv: { h: 0, s: 0, v: 100, a: 1 },
          rgb: { r: 255, g: 255, b: 255, a: 1 },
        },
      },
    ],
  },
  {
    title: 'Retrô',
    description: 'Nostálgico e estiloso',
    paletteColors: [
      {
        [ColorIdEnum.BACKGROUND_COLOR]: {
          hex: '#008080',
          hsv: { h: 180, s: 100, v: 50, a: 1 },
          rgb: { r: 0, g: 128, b: 128, a: 1 },
        },
      },
      {
        [ColorIdEnum.PRIMARY_COLOR]: {
          hex: '#FFD700',
          hsv: { h: 51, s: 100, v: 100, a: 1 },
          rgb: { r: 255, g: 215, b: 0, a: 1 },
        },
      },
      {
        [ColorIdEnum.SECONDARY_COLOR]: {
          hex: '#FF6347',
          hsv: { h: 9, s: 100, v: 100, a: 1 },
          rgb: { r: 255, g: 99, b: 71, a: 1 },
        },
      },
      {
        [ColorIdEnum.TERTIARY_COLOR]: {
          hex: '#DC143C',
          hsv: { h: 348, s: 91, v: 86, a: 1 },
          rgb: { r: 220, g: 20, b: 60, a: 1 },
        },
      },
      {
        [ColorIdEnum.TEXT_COLOR]: {
          hex: '#000000',
          hsv: { h: 0, s: 0, v: 0, a: 1 },
          rgb: { r: 0, g: 0, b: 0, a: 1 },
        },
      },
    ],
  },
  {
    title: 'Dinâmico',
    description: 'Ativo e brilhante',
    paletteColors: [
      {
        [ColorIdEnum.BACKGROUND_COLOR]: {
          hex: '#FFFF00',
          hsv: { h: 60, s: 100, v: 100, a: 1 },
          rgb: { r: 255, g: 255, b: 0, a: 1 },
        },
      },
      {
        [ColorIdEnum.PRIMARY_COLOR]: {
          hex: '#FF00FF',
          hsv: { h: 300, s: 100, v: 100, a: 1 },
          rgb: { r: 255, g: 0, b: 255, a: 1 },
        },
      },
      {
        [ColorIdEnum.SECONDARY_COLOR]: {
          hex: '#8A2BE2',
          hsv: { h: 271, s: 81, v: 88, a: 1 },
          rgb: { r: 138, g: 43, b: 226, a: 1 },
        },
      },
      {
        [ColorIdEnum.TERTIARY_COLOR]: {
          hex: '#4B0082',
          hsv: { h: 275, s: 100, v: 51, a: 1 },
          rgb: { r: 75, g: 0, b: 130, a: 1 },
        },
      },
      {
        [ColorIdEnum.TEXT_COLOR]: {
          hex: '#FFFFFF',
          hsv: { h: 0, s: 0, v: 100, a: 1 },
          rgb: { r: 255, g: 255, b: 255, a: 1 },
        },
      },
    ],
  },
  {
    title: 'Nostálgico',
    description: 'Aconchegante e confortável',
    paletteColors: [
      {
        [ColorIdEnum.BACKGROUND_COLOR]: {
          hex: '#8B0000',
          hsv: { h: 0, s: 100, v: 55, a: 1 },
          rgb: { r: 139, g: 0, b: 0, a: 1 },
        },
      },
      {
        [ColorIdEnum.PRIMARY_COLOR]: {
          hex: '#FFE4E1',
          hsv: { h: 6, s: 14, v: 100, a: 1 },
          rgb: { r: 255, g: 228, b: 225, a: 1 },
        },
      },
      {
        [ColorIdEnum.SECONDARY_COLOR]: {
          hex: '#4682B4',
          hsv: { h: 207, s: 56, v: 71, a: 1 },
          rgb: { r: 70, g: 130, b: 180, a: 1 },
        },
      },
      {
        [ColorIdEnum.TERTIARY_COLOR]: {
          hex: '#D3D3D3',
          hsv: { h: 0, s: 0, v: 83, a: 1 },
          rgb: { r: 211, g: 211, b: 211, a: 1 },
        },
      },
      {
        [ColorIdEnum.TEXT_COLOR]: {
          hex: '#2F4F4F',
          hsv: { h: 180, s: 50, v: 31, a: 1 },
          rgb: { r: 47, g: 79, b: 79, a: 1 },
        },
      },
    ],
  },
]
