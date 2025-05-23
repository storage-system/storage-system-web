'use client'

import { Phone } from 'lucide-react'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

const navitems = [
  {
    name: 'Início',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Categorias',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Blog',
    subitems: [
      {
        name: 'Teste',
      },
    ],
  },
  {
    name: 'Sobre Nós',
    subitems: [],
  },
  {
    name: 'Fale Conosco',
    subitems: [],
  },
]

export function NavBar() {
  const { colors } = useEcommerceManagement()

  // Função helper para buscar cor por ID
  const getColorByType = (colorType: ColorIdEnum) => {
    return colors.find((color) => color.colorId === colorType)?.hex || ''
  }

  // Extrair cores específicas
  // const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)
  // const tertiaryColor = getColorByType(ColorIdEnum.TERTIARY_COLOR)

  return (
    <div
      className="flex w-full justify-center p-4"
      style={{
        backgroundColor: secondaryColor || '#334155',
      }}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <ul className="flex gap-6">
          {navitems.map((item) => (
            <li key={item.name}>
              <a
                href=""
                className="group relative transition-all duration-300 hover:opacity-80"
                style={{
                  color: textColor || '#d1d5db',
                }}
                onMouseEnter={(e) => {
                  if (primaryColor) {
                    e.currentTarget.style.color = primaryColor
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textColor || '#d1d5db'
                }}
              >
                {item.name}
                {/* Underline effect on hover */}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                  style={{
                    backgroundColor: primaryColor || '#3b82f6',
                  }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div
          className="flex items-center gap-2"
          style={{
            color: textColor || 'white',
          }}
        >
          <Phone
            className="transition-colors duration-300"
            style={{
              color: primaryColor || 'white',
            }}
          />
          <p className="font-medium">(219) 555-0114</p>
        </div>
      </div>
    </div>
  )
}
