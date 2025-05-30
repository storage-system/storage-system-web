import { ColorIdEnum } from '@/providers/ecommerce-management-provider'

export const initialColorConfig = [
  {
    colorId: ColorIdEnum.PRIMARY_COLOR,
    hex: '#5a00ff',
    rgb: { r: 90, g: 0, b: 255, a: 1 },
    hsv: { h: 251, s: 100, v: 100, a: 1 },
    title: 'Cor principal',
    description:
      'Aparece nos botões, no preço do produto e nos textos do rodapé.',
  },
  {
    colorId: ColorIdEnum.SECONDARY_COLOR,
    hex: '#e7effa',
    rgb: { r: 231, g: 239, b: 250, a: 1 },
    hsv: { h: 210, s: 8, v: 98, a: 1 },
    title: 'Cor secundária',
    description: 'Aparece na barra de anúncio.',
  },
  {
    colorId: ColorIdEnum.TERTIARY_COLOR,
    hex: '#ff5353',
    rgb: { r: 255, g: 83, b: 83, a: 1 },
    hsv: { h: 0, s: 67, v: 100, a: 1 },
    title: 'Cor de destaque',
    description:
      'Aparece nas promoções e nas mensagens de desconto, frete grátis e parcelamento sem juros.',
  },
  {
    colorId: ColorIdEnum.BACKGROUND_COLOR,
    hex: '#f3f9fd',
    rgb: { r: 243, g: 249, b: 253, a: 1 },
    hsv: { h: 210, s: 4, v: 99, a: 1 },
    title: 'Cor de fundo',
    description: 'Define o fundo do site.',
  },
  {
    colorId: ColorIdEnum.TEXT_COLOR,
    hex: '#2a3652',
    rgb: { r: 42, g: 54, b: 82, a: 1 },
    hsv: { h: 225, s: 49, v: 32, a: 1 },
    title: 'Cor do texto',
    description: 'Usada para textos principais e subtítulos.',
  },
]
