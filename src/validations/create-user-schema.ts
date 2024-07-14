import { UserRoles } from '@/constants/roles/user-roles'
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string({
    required_error: 'Campo obrigatório',
  }),
  email: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .email(),
  password: z.string({
    required_error: 'Campo obrigatório',
  }),
  phone: z.string({
    required_error: 'Campo obrigatório',
  }),
  roles: z.array(z.nativeEnum(UserRoles)).default([UserRoles.ADMIN]),
})

export type CreateUserType = z.infer<typeof createUserSchema>
export type CreateUserInput = z.input<typeof createUserSchema>
export type CreateUserOutput = z.output<typeof createUserSchema>
