import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type MetricItemProps = {
  item: {
    label: string
    value: string | number
    icon: ReactNode
  }
}

export const MetricItem = ({ item }: MetricItemProps) => (
  <motion.div
    className="flex w-full cursor-pointer flex-col justify-between rounded-lg bg-white p-3 shadow-default transition duration-500 hover:scale-105 hover:bg-gray-100 dark:bg-accent dark:shadow-none dark:hover:bg-gray-700"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-2">
      {item.icon}
      <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
    </div>
    <p className="mt-2 text-3xl font-bold text-gray-500 dark:text-gray-200">
      {item.value}
    </p>
  </motion.div>
)
