import { ErrorMessagesProps } from '@/@types/toast-messages'

interface ProductToastMessagesProps {
  createSuccess: ErrorMessagesProps
  createError: ErrorMessagesProps
}

export const productErrorMessages: ProductToastMessagesProps = {
  createSuccess: { title: 'Produto criado com sucesso', variant: 'success' },
  createError: { title: 'Erro ao criar o produto', variant: 'success' },
}