import { validateCNPJ } from '@/utils/cnpj-validator'
import { z } from 'zod'

const form_errors = {
  name: { required: 'O nome é obrigatório' },
  socialReason: { required: 'A razão é obrigatória' },
  cnpj: { required: 'O CNPJ é obrigatório', invalid: 'CNPJ inválido' },
  email: { required: 'O email é obrigatório', invalid: 'E-mail inválido' },
  contact: { required: 'O contato é obrigatório' },
  responsible: { required: 'O responsável é obrigatório' },
}

export const createCompanySchema = z.object({
  name: z.string({ required_error: form_errors.name.required }),
  socialReason: z.string({ required_error: form_errors.socialReason.required }),
  cnpj: z
    .string({ required_error: form_errors.cnpj.required })
    .refine((string) => validateCNPJ(string), form_errors.cnpj.invalid),
  email: z
    .string({ required_error: form_errors.email.required })
    .email({ message: form_errors.email.invalid }),
  contact: z.string({ required_error: form_errors.contact.required }),
})

export const createCompanyInputSchema = z.object({
  name: z.string({ required_error: form_errors.name.required }),
  socialReason: z.string({ required_error: form_errors.socialReason.required }),
  cnpj: z
    .string({ required_error: form_errors.cnpj.required })
    .refine((string) => validateCNPJ(string), form_errors.cnpj.invalid),
  email: z
    .string({ required_error: form_errors.email.required })
    .email({ message: form_errors.email.invalid }),
  contact: z.string({ required_error: form_errors.contact.required }),
  responsible: z.string({ required_error: form_errors.responsible.required }),
})

export type CreateCompanyType = z.infer<typeof createCompanySchema>
export type CreateCompanyInput = z.input<typeof createCompanyInputSchema>
export type CreateCompanyOutput = z.output<typeof createCompanySchema>

const address_errors = {
  street: { required: 'Street is required' },
  number: { required: 'Number is required' },
  complement: { optional: 'Complement is optional' },
  district: { required: 'District is required' },
  city: { required: 'City is required' },
  state: { required: 'State is required' },
  country: { required: 'Country is required' },
  postalCode: { required: 'Postal code is required' },
  stateRegistration: { optional: 'State registration is optional' },
}

export const createCompanyAddressSchema = z.object({
  street: z.string({ required_error: address_errors.street.required }),
  number: z.string({ required_error: address_errors.number.required }),
  complement: z.string().optional(),
  district: z.string({ required_error: address_errors.district.required }),
  city: z.string({ required_error: address_errors.city.required }),
  state: z.string({ required_error: address_errors.state.required }),
  country: z.string({ required_error: address_errors.country.required }),
  postalCode: z.string({ required_error: address_errors.postalCode.required }),
  stateRegistration: z.string().optional(),
})

export type CreateCompanyAddressType = z.infer<
  typeof createCompanyAddressSchema
>
export type CreateCompanyAddressInput = z.input<
  typeof createCompanyAddressSchema
>
export type CreateCompanyAddressOutput = z.output<
  typeof createCompanyAddressSchema
>
