import { z } from 'zod'
import { createStyleSchema } from './create-style-schema'

export const publishEcommerceSchema = z.object({
  name: z.string(),
  style: createStyleSchema,
})

export type PublishEcommerceInput = z.input<typeof publishEcommerceSchema>
export type PublishEcommerceType = z.infer<typeof publishEcommerceSchema>
export type PublishEcommerceOutput = z.output<typeof publishEcommerceSchema>
