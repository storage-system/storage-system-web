import { ReactNode } from 'react'

interface ProductDetailProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  content?: any
  children?: ReactNode
}
export function ProductDetailItem({
  content: name,
  title,
  children,
  ...props
}: ProductDetailProps) {
  return (
    <div {...props}>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <div>
        {children && !name ? (
          children
        ) : (
          <p className="text-[16px] font-semibold text-primary">{name}</p>
        )}
      </div>
    </div>
  )
}
