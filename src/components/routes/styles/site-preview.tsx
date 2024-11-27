import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useStyles } from '@/providers/style-provider'
import { Images } from 'lucide-react'

export function SitePreview() {
  const { colors } = useStyles()

  const getColorById = (colorId: string) =>
    colors.find((color) => color.colorId === colorId)?.hex || '#fff'

  return (
    <div style={{ backgroundColor: getColorById('backgroundColor') }}>
      <div
        className="h-16"
        style={{ backgroundColor: getColorById('secondary') }}
      ></div>

      <div className="my-14">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <Separator style={{ backgroundColor: getColorById('highlight') }} />
            <p style={{ color: getColorById('highlight') }}>Destaques</p>
            <Separator style={{ backgroundColor: getColorById('highlight') }} />
          </div>
          <p
            className="text-3xl font-medium"
            style={{ color: getColorById('primary') }}
          >
            Os mais vendidos
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid max-w-[900px] grid-cols-4 gap-32">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="h-72 w-56 overflow-hidden rounded-xl border-2"
              style={{ borderColor: getColorById('primary') }}
              key={index}
            >
              <div
                className="flex h-1/2 items-center justify-center border-b-2"
                style={{
                  backgroundColor: getColorById('secondary'),
                  borderColor: getColorById('primary'),
                }}
              >
                <Images
                  className="size-12"
                  style={{ color: getColorById('primary') }}
                />
              </div>
              <div className="flex flex-col gap-4 px-3 py-2">
                <div>
                  <p style={{ color: getColorById('highlight') }}>R$ 2.789</p>
                  <p>
                    <span style={{ color: getColorById('primary') }}>
                      10x R$278,90{' '}
                    </span>
                    <span style={{ color: getColorById('secondary') }}>
                      sem juros
                    </span>
                  </p>
                </div>
                <p
                  className="h-[200px]"
                  style={{ color: getColorById('primary') }}
                >
                  Smart TV LG AI ThinQ ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <Button
          style={{
            backgroundColor: getColorById('primary'),
            color: getColorById('textColor'),
          }}
        >
          Ver todos os produtos
        </Button>
      </div>
    </div>
  )
}
