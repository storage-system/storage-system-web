import { z } from 'zod'
import { createStyleSchema } from './create-style-schema'

const heroItemSchema = z.object({
  text: z.string().min(1).max(255),
  fileId: z.string().uuid().min(1),
})

export const heroSchema = z.object({
  hero: z.array(heroItemSchema),
})

const benefitsItemSchema = z.object({
  text: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  fileId: z.string().uuid().min(1),
})

export const benefitsSchema = z.object({
  benefits: z.array(benefitsItemSchema),
})

export const initialFormSchema = z.object({
  name: z.string().min(1).max(255),
  ecommercePreview: z.string().uuid().optional(),
})

export const publishEcommerceSchema = z.object({
  name: z.string().min(1).max(255),
  ecommercePreview: z.string().uuid().optional(),
  style: createStyleSchema.optional(),
  hero: z.array(heroItemSchema),
  benefits: z.array(benefitsItemSchema),
})

export type HeroType = z.infer<typeof heroSchema>
export type BenefitsType = z.infer<typeof benefitsSchema>
export type InitialFormType = z.infer<typeof initialFormSchema>
export type PublishEcommerceType = z.infer<typeof publishEcommerceSchema>
