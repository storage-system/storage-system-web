'use client'

import { type ReactNode } from 'react'

import { cn } from '@/utils/class-name'

export function Content({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        'w-full transition-all bg-background scrollbar-thin mx-5 md:ml-[330px] md:max-w-[calc(100vw_-_290px)]',
      )}
    >
      {children}
    </main>
  )
}
