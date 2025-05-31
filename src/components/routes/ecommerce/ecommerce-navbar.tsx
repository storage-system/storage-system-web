'use client'

import { Phone } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEcommerce } from '@/providers/ecommerce-provider'

const navitems = [
  {
    name: 'Início',
    subitems: [{ name: 'Teste' }],
  },
  {
    name: 'Categorias',
    subitems: [{ name: 'Teste' }],
  },
  {
    name: 'Blog',
    subitems: [{ name: 'Teste' }],
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

// Função para contraste
function getContrastTextColor(hex: string): string {
  if (!hex?.startsWith('#')) return '#000'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#000000' : '#ffffff'
}

export function NavBar() {
  const { slug }: { slug: string } = useParams()
  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.secondaryColor || '#334155'
  const primaryColor = activeStyle?.primaryColor || ''
  const textColor = getContrastTextColor(backgroundColor)

  return (
    <div className="flex w-full justify-center p-4" style={{ backgroundColor }}>
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <ul className="flex gap-6">
          {navitems.map((item) => (
            <li key={item.name}>
              <a
                href={`/${slug}/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative transition-all duration-300 hover:opacity-80"
                style={{ color: textColor }}
                onMouseEnter={(e) => {
                  if (primaryColor) e.currentTarget.style.color = primaryColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textColor
                }}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: primaryColor || textColor }}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2" style={{ color: textColor }}>
          <Phone
            className="transition-colors duration-300"
            style={{ color: primaryColor || textColor }}
          />
          <p className="font-medium">(219) 555-0114</p>
        </div>
      </div>
    </div>
  )
}
