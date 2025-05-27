'use client'

import { useEcommerce } from '@/providers/ecommerce-provider'

export function Footer() {
  const { config } = useEcommerce()
  const style = config.styles.find((s) => s.isActive)

  return (
    <footer
      className="flex flex-col items-center pt-16"
      style={{ backgroundColor: style?.secondaryColor }}
    >
      <div className="grid w-full max-w-[1000px] grid-cols-5 gap-36 pb-8">
        <div className="col-span-2">
          <h3 className="mb-4 text-xl" style={{ color: style?.textColor }}>
            Sobre a Loja
          </h3>
          <p style={{ color: style?.textColor }}>
            Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
            dui, eget bibendum magna congue nec.
          </p>
        </div>
        <div>
          <h3
            className="mb-4 text-nowrap text-xl"
            style={{ color: style?.textColor }}
          >
            Minha Conta
          </h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                style={{ color: style?.primaryColor }}
                className="cursor-pointer"
              >
                Link {index}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl" style={{ color: style?.textColor }}>
            Ajuda
          </h3>
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <li
                key={index}
                style={{ color: style?.primaryColor }}
                className="cursor-pointer"
              >
                Link {index}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-center bg-slate-600/30 py-8">
        <p style={{ color: style?.textColor ?? '#d1d5db' }}>
          Nome da loja © 2024. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
