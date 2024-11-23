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
      <p className="text-sm font-normal text-gray-500">{title}</p>
      <div>
        {children && !name ? (
          children
        ) : (
          <p className="text-[16px] font-semibold text-textPrimary">{name}</p>
        )}
      </div>
    </div>
  )
}
