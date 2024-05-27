import { z } from "zod"

export const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type AuthenticateType = z.infer<typeof authenticateSchema>
export type AuthenticateInput = z.input<typeof authenticateSchema>
export type AuthenticateOutput = z.output<typeof authenticateSchema>