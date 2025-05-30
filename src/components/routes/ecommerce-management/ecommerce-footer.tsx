'use client'

import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

export function Footer() {
  const { colors } = useEcommerceManagement()

  const getColorByType = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)

  return (
    <footer
      className="flex flex-col items-center pt-16"
      style={{ backgroundColor: backgroundColor || '#e5e7eb' }}
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
              <li key={index} style={{ color: primaryColor }}>
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
              <li key={index} style={{ color: primaryColor }}>
                Link {index}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="flex w-full justify-center py-8"
        style={{
          backgroundColor: textColor + '10',
        }}
      >
        <p style={{ color: textColor + '99' }}>
          Nome da loja © 2024. Todos os direitos reservados
        </p>
      </div>
    </footer>
  )
}
