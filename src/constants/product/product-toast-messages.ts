import { toastVariants } from '@/components/ui/toast'
import { VariantProps } from 'class-variance-authority'

interface ProductToastMessagesProps extends VariantProps<typeof toastVariants> {
  title: string
  text?: string
}

export const productToastMessages: {
  createSuccess: ProductToastMessagesProps
  createError: ProductToastMessagesProps
} = {
  createSuccess: { title: 'Produto criado com sucesso', variant: 'success' },
  createError: { title: 'Erro ao criar o produto', variant: 'success' },
}
