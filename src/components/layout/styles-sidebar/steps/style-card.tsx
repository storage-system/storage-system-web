import { cn } from '@/utils/class-name'

interface StyleCardProps {
  className?: string
  onClick?: () => void
  title?: string
  description?: string
  paletteColors: string[]
}

export function StyleCard({
  className,
  onClick,
  title,
  description,
  paletteColors,
}: StyleCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'hover:cursor-pointer hover:scale-[101%] transition-all duration-100 flex items-center justify-between overflow-hidden rounded-sm border border-gray-200 px-3',
        className,
      )}
    >
      <div className="flex basis-[145px] flex-col py-[14px]">
        <p className="text-[14px] font-medium">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {paletteColors.map((color, index) => (
          <div
            key={index}
            className="size-6 rounded-sm border"
            style={{ background: color }}
          ></div>
        ))}
      </div>
    </div>
  )
}
