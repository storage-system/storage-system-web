import { z } from 'zod'

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
})

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>
export type UpdateCategoryInput = z.input<typeof updateCategorySchema>
export type UpdateCategoryOutput = z.output<typeof updateCategorySchema>
