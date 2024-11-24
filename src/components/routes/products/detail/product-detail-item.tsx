import { ReactNode } from 'react'

interface ProductDetailProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  content?: any
  children?: ReactNode
  icon?: ReactNode
}

export function ProductDetailItem({
  content: name,
  title,
  children,
  icon,
  ...props
}: ProductDetailProps) {
  return (
    <div {...props}>
      <p className="text-sm font-normal text-black dark:text-white">{title}</p>
      <div>
        {children && !name ? (
          children
        ) : (
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="text-gray-400 dark:text-gray-500">{icon}</div>
            )}
            <p className="text-[16px] font-normal text-gray-400 dark:text-gray-500">
              {name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
