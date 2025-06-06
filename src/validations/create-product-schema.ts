import { StatusProduct } from '@/constants/product/product-status-enum'
import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  description: z
    .string({ required_error: 'A descrição é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  originalPrice: z.coerce
    .number({ required_error: 'O preço original é obrigatório' })
    .positive({ message: 'O preço original deve ser um valor positivo' }),

  finalPrice: z.coerce
    .number({ required_error: 'O preço final é obrigatório' })
    .positive({ message: 'O preço final deve ser um valor positivo' }),

  discountPercentage: z.coerce
    .number({ required_error: 'A porcentagem de desconto é obrigatória' })
    .min(0, { message: 'A porcentagem de desconto não pode ser negativa' })
    .max(100, { message: 'A porcentagem de desconto não pode exceder 100%' }),

  quantityInStock: z.coerce
    .number({ required_error: 'A quantidade em estoque é obrigatória' })
    .int({ message: 'A quantidade em estoque deve ser um número inteiro' })
    .nonnegative({ message: 'A quantidade em estoque não pode ser negativa' }),

  minimumStock: z.coerce
    .number({ required_error: 'A quantidade em estoque é obrigatória' })
    .int({ message: 'A quantidade em estoque deve ser um número inteiro' })
    .nonnegative({ message: 'A quantidade em estoque não pode ser negativa' }),

  manufactureDate: z.date().optional(),

  validityInDays: z.coerce
    .number({ required_error: 'A validade em dias é obrigatória' })
    .int({ message: 'A validade em dias deve ser um número inteiro' })
    .positive({ message: 'A validade em dias deve ser um valor positivo' }),

  unitOfMeasure: z
    .string({ required_error: 'A unidade de medida é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  weight: z.coerce
    .number({ required_error: 'O peso é obrigatório' })
    .positive({ message: 'O peso deve ser um valor positivo' }),

  height: z
    .string({ required_error: 'A altura é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  width: z
    .string({ required_error: 'A largura é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  depth: z
    .string({ required_error: 'A profundidade é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' }),

  manufacturer: z.string().optional(),

  batch: z.string().optional(),

  status: z.nativeEnum(StatusProduct, {
    required_error: 'O status é obrigatório',
  }),

  companyId: z
    .string({ required_error: 'O ID da empresa é obrigatório' })
    .uuid({ message: 'O ID da empresa deve ser um UUID válido' }),

  categoryIds: z.array(
    z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .optional()
      .transform((item) => (item?.value ? item.value : null))
      .nullable(),
    {
      required_error: 'O ID da categoria é obrigatório',
    },
  ),

  fileIds: z.array(z.string().uuid()).optional(),
})

export type CreateProductType = z.infer<typeof createProductSchema>
export type CreateProductInput = z.input<typeof createProductSchema>
export type CreateProductOutput = z.output<typeof createProductSchema>
