interface ErrorMessagesProps {
  title: string
  variant: 'default' | 'success' | 'destructive' | null | undefined
}

interface ProductToastMessagesProps {
  createSuccess: ErrorMessagesProps
  createError: ErrorMessagesProps
  updateSuccess: ErrorMessagesProps
  updateError: ErrorMessagesProps
}

export const productErrorMessages: ProductToastMessagesProps = {
  createSuccess: { title: 'Produto criado com sucesso', variant: 'success' },
  createError: { title: 'Erro ao criar o produto', variant: 'destructive' },
  updateSuccess: {
    title: 'Produto atualizado com sucesso',
    variant: 'success',
  },
  updateError: { title: 'Erro ao atualizar o produto', variant: 'destructive' },
}
