import { ColorIdEnum, Theme } from '@/providers/style-provider'

export const initialColorConfig: Theme = {
  title: 'Tema personalizado',
  description: 'Este tema é usado em todo o site.',
  paletteColors: [
    {
      [ColorIdEnum.PRIMARY_COLOR]: {
        hex: '#3b82f6',
        rgb: { r: 59, g: 130, b: 246, a: 1 },
        hsv: { h: 212, s: 76, v: 96, a: 1 },
        title: 'Cor principal',
        description:
          'Aparece nos botões, no preço do produto e nos textos do rodapé.',
      },
    },
    {
      [ColorIdEnum.SECONDARY_COLOR]: {
        hex: '#2b0c4f',
        rgb: { r: 49, g: 12, b: 78, a: 1 },
        hsv: { h: 268, s: 85, v: 31, a: 1 },
        title: 'Cor secundária',
        description: 'Aparece na barra de anúncio.',
      },
    },
    {
      [ColorIdEnum.TERTIARY_COLOR]: {
        hex: '#10b981',
        rgb: { r: 16, g: 185, b: 129, a: 1 },
        hsv: { h: 160, s: 91, v: 73, a: 1 },
        title: 'Cor de destaque',
        description:
          'Aparece nas promoções e nas mensagens de desconto, frete grátis e parcelamento sem juros.',
      },
    },
    {
      [ColorIdEnum.BACKGROUND_COLOR]: {
        hex: '#ffffff',
        rgb: { r: 255, g: 255, b: 255, a: 1 },
        hsv: { h: 0, s: 0, v: 100, a: 1 },
        title: 'Cor de fundo',
        description: 'Define o fundo do site.',
      },
    },
    {
      [ColorIdEnum.TEXT_COLOR]: {
        hex: '#000000',
        rgb: { r: 0, g: 0, b: 0, a: 1 },
        hsv: { h: 0, s: 0, v: 0, a: 1 },
        title: 'Cor do texto',
        description: 'Usada para textos principais e subtítulos.',
      },
    },
  ],
}
