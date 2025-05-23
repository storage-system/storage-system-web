'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Headphones, Package, ShoppingBag, Truck } from 'lucide-react'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'

const benefits = [
  {
    icon: Truck,
    title: 'Frete Grátis',
    description: 'Frete grátis em todos os seus pedidos',
  },
  {
    icon: Headphones,
    title: 'Atendimento ao Cliente 24/7',
    description: 'Acesso instantâneo ao Suporte',
  },
  {
    icon: ShoppingBag,
    title: 'Pagamento 100% Seguro',
    description: 'Garantimos que seu dinheiro está seguro',
  },
  {
    icon: Package,
    title: 'Garantia de Devolução do Dinheiro',
    description: 'Garantia de Devolução do Dinheiro em 30 Dias',
  },
]

export function BenefitsSection() {
  const { colors } = useEcommerceManagement()

  // Função helper para buscar cor por ID
  const getColorByType = (colorType: ColorIdEnum) => {
    return colors.find((color) => color.colorId === colorType)?.hex || ''
  }

  // Extrair cores específicas
  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)
  const tertiaryColor = getColorByType(ColorIdEnum.TERTIARY_COLOR)

  return (
    <div className="flex justify-center pb-16">
      <Card
        className="flex h-[168px] w-full max-w-[1200px] items-center border-2 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        style={{
          backgroundColor: backgroundColor || 'white',
        }}
      >
        <CardContent className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ description, title, icon: Icon }) => (
            <div
              key={title}
              className="group flex cursor-pointer items-center gap-4 transition-all duration-300 hover:scale-105"
            >
              <div
                className="rounded-full p-3 transition-all duration-300 group-hover:shadow-lg"
                style={{
                  backgroundColor: primaryColor
                    ? `${primaryColor}20`
                    : '#f3f4f6',
                }}
              >
                <Icon
                  className="size-9 transition-colors duration-300"
                  style={{
                    color: primaryColor || '#3b82f6',
                  }}
                />
              </div>
              <div className="flex-1">
                <p
                  className="mb-1 text-sm font-bold transition-colors duration-300 sm:text-base"
                  style={{
                    color: textColor || '#1f2937',
                  }}
                >
                  {title}
                </p>
                <p
                  className="text-xs leading-relaxed sm:text-sm"
                  style={{
                    color: secondaryColor || '#6b7280',
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
