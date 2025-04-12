import { cn } from '@/utils/class-name'
import { ShoppingBag, Star } from 'lucide-react'

export function NewProduct({ index }: { index: number }) {
  return (
    <div
      className={cn('flex h-80 w-60 flex-col border bg-background rounded-md')}
    >
      <div className="w-full flex-1 bg-gray-200"></div>
      <div className="flex basis-[120px] items-center justify-between bg-background px-4">
        <div>
          <p className="text-lg text-gray-600">Nome do produto</p>
          <div>
            <p className="text-lg font-bold text-gray-600">RS 14,99</p>{' '}
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-4 fill-amber-600 text-amber-600"
              />
            ))}
          </div>
        </div>
        <div
          className={cn(
            'rounded-full p-3',
            index === 0 ? 'bg-primary/20 text-primary' : 'bg-gray-300',
          )}
        >
          <ShoppingBag />
        </div>
      </div>
    </div>
  )
}
