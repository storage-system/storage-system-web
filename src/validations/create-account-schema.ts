import { z } from "zod"

export const createAccountSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório'
  }),
  email: z.string({
    required_error: 'Campo obrigatório'
  }).email(),
  contact: z.string({
    required_error: 'Campo obrigatório'
  }),
  responsible: z.string({
    required_error: 'Campo obrigatório'
  }),
  password: z.string({
    required_error: 'Campo obrigatório'
  }),
})

export type CreateAccountType = z.infer<typeof createAccountSchema>
export type CreateAccountInput = z.input<typeof createAccountSchema>
export type CreateAccountOutput = z.output<typeof createAccountSchema>