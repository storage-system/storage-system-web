'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Headphones, Package, ShoppingBag, Truck } from 'lucide-react'
import { useEcommerce } from '@/providers/ecommerce-provider'

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

// Utilitário para escurecer cor secundária
function darkenHexColor(hex: string, amount = 0.1): string {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const { h, s, l } = rgbToHsl(r, g, b)
  const newL = Math.max(0, Math.min(1, l - amount))
  const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL)
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h, s, l }
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

function toHex(c: number): string {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

export function BenefitsSection() {
  const { activeStyle } = useEcommerce()

  const backgroundColor = activeStyle?.backgroundColor || '#ffffff'
  const textColor = activeStyle?.textColor || '#1f2937'
  const primaryColor = activeStyle?.primaryColor || '#3b82f6'
  const secondaryColor = activeStyle?.secondaryColor || '#4b5563'

  const iconBg = primaryColor ? `${primaryColor}22` : '#f3f4f6'

  return (
    <div className="flex justify-center pb-16">
      <Card
        className="flex w-full max-w-[1200px] items-center border border-border bg-muted/10 shadow-sm transition-all duration-300 hover:shadow-md"
        style={{ backgroundColor }}
      >
        <CardContent className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ description, title, icon: Icon }, index) => (
            <div
              key={title + index}
              className="group col-span-1 flex cursor-pointer items-start gap-4 rounded-md transition-all duration-300 hover:scale-[1.02]"
            >
              <div
                className="flex size-14 min-w-14 items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-md"
                style={{ backgroundColor: iconBg }}
              >
                <Icon className="size-7" style={{ color: primaryColor }} />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-sm font-semibold sm:text-base"
                  style={{ color: textColor }}
                >
                  {title}
                </p>
                {description && (
                  <p
                    className="mt-1 text-xs leading-relaxed sm:text-sm"
                    style={{
                      color: darkenHexColor(secondaryColor, 0.15),
                    }}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
