'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMetricsSection } from './metrics-section'

export function CardsMetrics() {
  const { sections } = useMetricsSection()

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
                <motion.div
                  className="flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white p-3 shadow-default transition duration-500 hover:scale-105 hover:bg-gray-100 dark:bg-accent dark:shadow-none dark:hover:bg-gray-700"
                  key={i}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-gray-500 dark:text-gray-200">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  )
}
