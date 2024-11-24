'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { SectionsType } from '@/@types/metrics'
import { useMetrics } from './use-metrics'
import { MetricItem } from './metric-item'
import { getSections } from '@/constants/metrics/get-sections'
import { Skeleton } from '@/components/ui/skeleton'

export function CardsMetrics() {
  const { data } = useMetrics()

  const sections: SectionsType[] = getSections(data)

  if (!data) {
    return Array.from({ length: 5 }).map((_, index) => {
      return (
        <Skeleton
          className="h-12 w-full bg-accent shadow-default"
          key={index}
        />
      )
    })
  }

  return (
    <div className="flex w-full flex-col space-y-6">
      {sections.map((section, index) => (
        <div className="flex flex-col space-y-3" key={index}>
          <motion.p
            animate={{ opacity: [0, 0.5, 1] }}
            className="font-semibold text-textPrimary"
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          >
            {section.title}
          </motion.p>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {section.items.map((item, i) => (
                <MetricItem key={i} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  )
}
