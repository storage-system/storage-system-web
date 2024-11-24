import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useStyles } from '@/providers/style-provider'
import { Images } from 'lucide-react'

export function SitePreview() {
  const { colors } = useStyles()

  return (
    <div>
      <div
        className="h-16"
        style={{ backgroundColor: colors.secondary.hex }}
      ></div>

      <div className="my-14">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <Separator style={{ backgroundColor: colors.highlight.hex }} />
            <p style={{ color: colors.highlight.hex }}>Destaques</p>
            <Separator style={{ backgroundColor: colors.highlight.hex }} />
          </div>
          <p
            className="text-3xl font-medium"
            style={{ color: colors.primary.hex }}
          >
            Os mais vendidos
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid max-w-[900px] grid-cols-4 gap-32">
          {Array.from({ length: 4 }).map((item, index) => (
            <div
              className="h-72 w-56 overflow-hidden rounded-xl border-2"
              style={{ borderColor: colors.primary.hex }}
              key={index}
            >
              <div
                className="flex h-1/2 items-center justify-center border-b-2"
                style={{
                  backgroundColor: colors.secondary.hex,
                  borderColor: colors.primary.hex,
                }}
              >
                <Images
                  className="size-12"
                  style={{ color: colors.primary.hex }}
                />
              </div>
              <div className="flex flex-col gap-4 px-3 py-2">
                <div>
                  <p style={{ color: colors.highlight.hex }}>R$ 2.789</p>
                  <p>
                    <span style={{ color: colors.primary.hex }}>
                      10x R$278,90{' '}
                    </span>
                    <span style={{ color: colors.secondary.hex }}>
                      sem juros
                    </span>
                  </p>
                </div>
                <p className="h-[200px]" style={{ color: colors.primary.hex }}>
                  Smart TV LG AI ThinQ ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <Button style={{ backgroundColor: colors.primary.hex, color: 'white' }}>
          Ver todos os produtos
        </Button>
      </div>
    </div>
  )
}
