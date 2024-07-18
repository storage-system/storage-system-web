import { z } from 'zod'

const form_errors = {
  name: { required: 'O nome é obrigatório' },
  email: { required: 'O email é obrigatório', invalid: 'E-mail inválido' },
  contact: { required: 'O contato é obrigatório' },
  responsible: { required: 'O responsável é obrigatório' },
  password: { required: 'A senha é obrigatória' },
  users: {
    required: 'Os usuários são obrigatórios',
    min: 'Selecione no mínimo 1 usuário',
  },
}

export const createCompanySchema = z.object({
  name: z.string({ required_error: form_errors.name.required }),
  email: z
    .string({ required_error: form_errors.email.required })
    .email({ message: form_errors.email.invalid }),
  contact: z.string({ required_error: form_errors.contact.required }),
  responsible: z.string({ required_error: form_errors.responsible.required }),
  password: z.string({ required_error: form_errors.password.required }),
  users: z
    .array(
      z
        .object({
          label: z.string(),
          value: z.string(),
        })
        .transform((item) => (item?.value ? item.value : null))
        .nullable(),
      { required_error: form_errors.users.required },
    )
    .min(1, { message: form_errors.users.min }),
})

export type CreateCompanyType = z.infer<typeof createCompanySchema>
export type CreateCompanyInput = z.input<typeof createCompanySchema>
export type CreateCompanyOutput = z.output<typeof createCompanySchema>
