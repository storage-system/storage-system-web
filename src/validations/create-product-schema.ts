import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'Mínimo de 1 caractere' }),
  isActive: z.boolean(),
})

export type CreateCategoryType = z.infer<typeof createCategorySchema>
export type CreateCategoryInput = z.input<typeof createCategorySchema>
export type CreateCategoryOutput = z.output<typeof createCategorySchema>
