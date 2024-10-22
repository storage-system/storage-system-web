'use client'

import { cn } from '@/utils/class-name'
import {
  TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function getRandomColor(): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return `#${randomColor.padStart(6, '0')}`
}

function ColorPreview({ label }: { label: string }) {
  const randomColor = getRandomColor().toUpperCase()
  return (
    <TooltipRoot>
      <TooltipTrigger>
        <div
          className="size-8 rounded-full"
          style={{ background: randomColor }}
        />
      </TooltipTrigger>
      <TooltipContent>
        {label} : {randomColor}
      </TooltipContent>
    </TooltipRoot>
  )
}

export function ListStyles() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center justify-between w-full h-14 rounded-md border-2 border-input px-4',
          )}
        >
          <div>
            <p>Nome do estilo</p>
          </div>
          <div className="flex gap-4">
            <ColorPreview label="Cor Primária" />
            <ColorPreview label="Cor Secundária" />
            <ColorPreview label="Cor Terciária" />
          </div>
        </div>
      ))}
    </div>
  )
}
