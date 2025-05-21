import { z } from 'zod'
import { createStyleSchema } from './create-style-schema'

const heroItemSchema = z.object({
  text: z.string().min(1).max(255),
  fileId: z.string().uuid().min(1),
})

export const heroSchema = z.object({
  hero: z.array(heroItemSchema),
})

export const publishEcommerceSchema = z.object({
  name: z.string().min(1).max(255),
  ecommercePreview: z.string().uuid().optional(),
  style: createStyleSchema.optional(),
  hero: z.array(heroItemSchema),
})

export type HeroType = z.infer<typeof heroSchema>
export type PublishEcommerceType = z.infer<typeof publishEcommerceSchema>
