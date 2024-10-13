import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'Mínimo de 1 caractere' }),
  isActive: z.boolean(),
  companyId: z.string().default('4bc57d1b-6f27-4c3e-82e3-9cddaa3f2d55'), // FIXME:
  fileId: z.string({ required_error: 'A imagem é obrigatória' }),
})

export type CreateCategoryType = z.infer<typeof createCategorySchema>
export type CreateCategoryInput = z.input<typeof createCategorySchema>
export type CreateCategoryOutput = z.output<typeof createCategorySchema>
