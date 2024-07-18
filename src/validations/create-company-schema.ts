import { z } from 'zod'

export const createCompanySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  contact: z.string(),
  responsible: z.string(),
  password: z.string(),
  users: z.array(z.string()),
})

export type CreateCompanyType = z.infer<typeof createCompanySchema>
export type CreateCompanyInput = z.input<typeof createCompanySchema>
export type CreateCompanyOutput = z.output<typeof createCompanySchema>
