import { z } from "zod"

export const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  contact: z.string(),
  responsible: z.string(),
  password: z.string(),
})

export type CreateAccountType = z.infer<typeof createAccountSchema>
export type CreateAccountInput = z.input<typeof createAccountSchema>
export type CreateAccountOutput = z.output<typeof createAccountSchema>