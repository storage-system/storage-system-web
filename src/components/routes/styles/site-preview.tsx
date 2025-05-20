import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEcommerceManagement } from '@/providers/ecommerce-management-provider'
import { ColorIdEnum } from '@/providers/style-provider'
import { Images } from 'lucide-react'

export function SitePreview() {
  const { colors } = useEcommerceManagement()

  const getColorById = (colorId: ColorIdEnum | string) =>
    colors.find((color) => color.colorId === colorId)?.hex || '#fff'

  return (
    <div
      className="h-full"
      style={{ backgroundColor: getColorById(ColorIdEnum.BACKGROUND_COLOR) }}
    >
      <div
        className="h-16"
        style={{ backgroundColor: getColorById(ColorIdEnum.SECONDARY_COLOR) }}
      ></div>

      <div className="my-14">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <Separator
              style={{
                backgroundColor: getColorById(ColorIdEnum.TERTIARY_COLOR),
              }}
            />
            <p style={{ color: getColorById(ColorIdEnum.TERTIARY_COLOR) }}>
              Destaques
            </p>
            <Separator
              style={{
                backgroundColor: getColorById(ColorIdEnum.TERTIARY_COLOR),
              }}
            />
          </div>
          <p
            className="text-3xl font-medium"
            style={{ color: getColorById(ColorIdEnum.PRIMARY_COLOR) }}
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
              style={{ borderColor: getColorById(ColorIdEnum.PRIMARY_COLOR) }}
              key={index}
            >
              <div
                className="flex h-1/2 items-center justify-center border-b-2"
                style={{
                  backgroundColor: getColorById(ColorIdEnum.SECONDARY_COLOR),
                  borderColor: getColorById(ColorIdEnum.PRIMARY_COLOR),
                }}
              >
                <Images
                  className="size-12"
                  style={{ color: getColorById(ColorIdEnum.PRIMARY_COLOR) }}
                />
              </div>
              <div className="flex flex-col gap-4 px-3 py-2">
                <div>
                  <p
                    style={{ color: getColorById(ColorIdEnum.TERTIARY_COLOR) }}
                  >
                    R$ 2.789
                  </p>
                  <p>
                    <span
                      style={{
                        color: getColorById(ColorIdEnum.PRIMARY_COLOR),
                      }}
                    >
                      10x R$278,90{' '}
                    </span>
                    <span
                      style={{
                        color: getColorById(ColorIdEnum.SECONDARY_COLOR),
                      }}
                    >
                      sem juros
                    </span>
                  </p>
                </div>
                <p
                  className="h-[200px]"
                  style={{ color: getColorById(ColorIdEnum.PRIMARY_COLOR) }}
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
            backgroundColor: getColorById(ColorIdEnum.PRIMARY_COLOR),
            color: getColorById(ColorIdEnum.TEXT_COLOR),
          }}
        >
          Ver todos os produtos
        </Button>
      </div>
    </div>
  )
}
