'use client'

import { Phone } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEcommerce } from '@/providers/ecommerce-provider'

export function NavBar() {
  const { slug }: { slug: string } = useParams()
  const { config } = useEcommerce()
  const style = config.styles.find((s) => s.isActive)

  const navitems = [
    {
      name: 'Início',
      href: `/${slug}/home`,
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

  return (
    <div
      className="flex w-full justify-center p-4"
      style={{ backgroundColor: style?.primaryColor }}
    >
      <div className="flex w-full max-w-[1200px] justify-between">
        <ul className="flex gap-4" style={{ color: style?.textColor }}>
          {navitems.map((item) => (
            <li key={item.name}>
              <a href={item.href ?? '#'}>{item.name}</a>
            </li>
          ))}
        </ul>

        <div
          className="flex items-center gap-2"
          style={{ color: style?.backgroundColor }}
        >
          <Phone />
          <p>(219) 555-0114</p>
        </div>
      </div>
    </div>
  )
}
