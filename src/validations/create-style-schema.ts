import { z } from 'zod'

export const createStyleSchema = z.object({
  companyId: z.string({
    required_error: 'O ID da empresa é obrigatório.',
    invalid_type_error: 'O ID da empresa deve ser uma string.',
  }),
  name: z.string({
    required_error: 'O nome do estilo é obrigatório.',
    invalid_type_error: 'O nome deve ser uma string.',
  }),
  isActive: z.boolean({
    required_error: 'O status ativo/inativo é obrigatório.',
    invalid_type_error: 'O status deve ser um valor booleano.',
  }),
  backgroundColor: z.string({
    required_error: 'A cor de fundo é obrigatória.',
    invalid_type_error: 'A cor de fundo deve ser uma string.',
  }),
  textColor: z.string({
    required_error: 'A cor do texto é obrigatória.',
    invalid_type_error: 'A cor do texto deve ser uma string.',
  }),
  primaryColor: z.string({
    required_error: 'A cor primária é obrigatória.',
    invalid_type_error: 'A cor primária deve ser uma string.',
  }),
  secondaryColor: z.string({
    required_error: 'A cor secundária é obrigatória.',
    invalid_type_error: 'A cor secundária deve ser uma string.',
  }),
  tertiaryColor: z.string({
    required_error: 'A cor terciária é obrigatória.',
    invalid_type_error: 'A cor terciária deve ser uma string.',
  }),
})

export type CreateStyleInput = z.input<typeof createStyleSchema>
export type CreateStyleType = z.infer<typeof createStyleSchema>
export type CreateStyleOutput = z.output<typeof createStyleSchema>
