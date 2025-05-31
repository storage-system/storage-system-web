'use client'

import { useEcommerce } from '@/providers/ecommerce-provider'

export function Footer() {
  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#e5e7eb'
  const textColor = activeStyle?.textColor || '#1f2937'
  const primaryColor = activeStyle?.primaryColor || '#3b82f6'

  return (
    <footer
      className="flex flex-col items-center pt-16"
      style={{ backgroundColor }}
    >
      <div className="grid w-full max-w-[1000px] grid-cols-5 gap-36 pb-8">
        <div className="col-span-2">
          <h3 className="mb-4 text-xl" style={{ color: textColor }}>
            Sobre a Loja
          </h3>
          <p style={{ color: textColor + 'cc' }}>
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-nowrap text-xl" style={{ color: textColor }}>
            Minha Conta
          </h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                className="cursor-pointer"
                style={{ color: primaryColor }}
              >
                Link {index}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl" style={{ color: textColor }}>
            Ajuda
          </h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                className="cursor-pointer"
                style={{ color: primaryColor }}
              >
                Link {index}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="flex w-full justify-center py-8"
        style={{ backgroundColor: textColor + '10' }}
      >
        <p style={{ color: textColor + '99' }}>
          Nome da loja © 2024. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
