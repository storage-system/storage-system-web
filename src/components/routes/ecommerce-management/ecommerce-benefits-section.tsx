'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  useEcommerceManagement,
  ColorIdEnum,
} from '@/providers/ecommerce-management-provider'
import { Headphones, Package, ShoppingBag, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'

const fallbackBenefits = [
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

interface SvgIconStrokeProps {
  file?: File
  fileUrl?: string
  color: string
}

function SvgIconStroke({ file, fileUrl, color }: SvgIconStrokeProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null)

  useEffect(() => {
    const renderSvg = async () => {
      try {
        const text = file
          ? await file.text()
          : fileUrl
            ? await fetch(fileUrl).then((res) => res.text())
            : null

        if (!text) return

        const cleaned = text
          .replace(/fill=".*?"/g, '')
          .replace(/stroke=".*?"/g, '')
          .replace(/stroke-width=".*?"/g, '')
          .replace(
            /<svg([^>]*)>/,
            `<svg$1 stroke="${color}" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">`,
          )
          .replace(
            /<(path|rect|circle|polygon|ellipse|line)([^>]*)(?<!\/)>/g,
            `<$1$2 stroke="${color}" stroke-width="2">`,
          )

        setSvgContent(cleaned)
      } catch (err) {
        console.error('Erro ao carregar SVG:', err)
      }
    }

    renderSvg()
  }, [file, fileUrl, color])

  if (!svgContent) return null

  return (
    <div
      className="flex size-9 items-center justify-center"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

export function BenefitsSection() {
  const { colors, benefitsForm } = useEcommerceManagement()

  const getColorByType = (type: ColorIdEnum) =>
    colors.find((c) => c.colorId === type)?.hex || ''

  const backgroundColor = getColorByType(ColorIdEnum.BACKGROUND_COLOR)
  const textColor = getColorByType(ColorIdEnum.TEXT_COLOR)
  const primaryColor = getColorByType(ColorIdEnum.PRIMARY_COLOR)
  const secondaryColor = getColorByType(ColorIdEnum.SECONDARY_COLOR)

  const formBenefits = benefitsForm.watch('benefits')
  const hasCustomBenefits = formBenefits?.length > 0

  const benefitsToRender = hasCustomBenefits
    ? formBenefits.map((benefit, index) => ({
        title: benefit.text || `Benefício ${index + 1}`,
        description: benefit.description || '',
        file: benefit.file,
        fileUrl: benefit.fileUrl,
      }))
    : []

  console.log('Benefits to render:', benefitsToRender)

  const iconBg = primaryColor ? `${primaryColor}22` : '#f3f4f6'

  return (
    <div className="flex justify-center pb-16">
      <Card
        className="flex w-full max-w-[1200px] items-center border border-border bg-muted/10 shadow-sm transition-all duration-300 hover:shadow-md"
        style={{ backgroundColor }}
      >
        <CardContent className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {(hasCustomBenefits ? benefitsToRender : fallbackBenefits).map(
            (item, index) => {
              const title = item.title
              const description = item.description

              const Icon = 'icon' in item ? item.icon : undefined
              const file = 'file' in item ? item.file : undefined
              const fileUrl = 'fileUrl' in item ? item.fileUrl : undefined

              return (
                <div
                  key={title + index}
                  className="group col-span-1 flex cursor-pointer items-start gap-4 rounded-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className="flex size-14 min-w-14 items-center justify-center rounded-full transition-shadow duration-300 group-hover:shadow-md"
                    style={{
                      backgroundColor: iconBg,
                    }}
                  >
                    {file || fileUrl ? (
                      <SvgIconStroke
                        file={file}
                        fileUrl={fileUrl}
                        color={primaryColor || '#3b82f6'}
                      />
                    ) : Icon ? (
                      <Icon
                        className="size-7"
                        style={{ color: primaryColor || '#3b82f6' }}
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className="text-sm font-semibold sm:text-base"
                      style={{ color: textColor || '#1f2937' }}
                    >
                      {title}
                    </p>
                    {description && (
                      <p
                        className="mt-1 text-xs leading-relaxed sm:text-sm"
                        style={{
                          color: darkenHexColor(
                            secondaryColor || '#4b5563',
                            0.15,
                          ),
                        }}
                      >
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              )
            },
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Funções auxiliares (sem alteração)
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
