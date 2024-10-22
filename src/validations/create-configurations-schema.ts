import { z } from 'zod'

export const createConfigurationsSchema = z.object({
  daysBeforeOldStock: z.coerce
    .number()
    .int()
    .nonnegative('Deve ser um número inteiro não negativo'),
  warningDays: z.coerce
    .number()
    .int()
    .nonnegative('Deve ser um número inteiro não negativo'),
  emailNotification: z.boolean().default(false),
  systemNotification: z.boolean().default(false),
  autoDiscardAfterExpiration: z.boolean().default(false),
  freeShippingOnOldStock: z.boolean().default(false),
  reportFrequency: z.enum(['diary', 'weekly', 'monthly'], {
    required_error:
      'Frequência do relatório deve ser "diary", "weekly" ou "monthly"',
  }),
})

export type CreateConfigurationsType = z.infer<
  typeof createConfigurationsSchema
>
export type CreateConfigurationsInput = z.input<
  typeof createConfigurationsSchema
> & {
  userId: string
  companyId: string
}
export type CreateConfigurationsOutput = z.output<
  typeof createConfigurationsSchema
>
