import { StatusProduct } from '@/constants/product/product-status-enum'
import { z } from 'zod'

export const updateProductSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  description: z
    .string({ required_error: 'A descrição é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  originalPrice: z.coerce
    .number({ required_error: 'O preço original é obrigatório' })
    .positive({ message: 'O preço original deve ser um valor positivo' })
    .optional(),

  finalPrice: z.coerce
    .number({ required_error: 'O preço final é obrigatório' })
    .positive({ message: 'O preço final deve ser um valor positivo' })
    .optional(),

  discountPercentage: z.coerce
    .number({ required_error: 'A porcentagem de desconto é obrigatória' })
    .min(0, { message: 'A porcentagem de desconto não pode ser negativa' })
    .max(100, { message: 'A porcentagem de desconto não pode exceder 100%' })
    .optional(),

  quantityInStock: z.coerce
    .number({ required_error: 'A quantidade em estoque é obrigatória' })
    .int({ message: 'A quantidade em estoque deve ser um número inteiro' })
    .nonnegative({ message: 'A quantidade em estoque não pode ser negativa' })
    .optional(),

  manufactureDate: z.date().optional(),

  validityInDays: z.coerce
    .number({ required_error: 'A validade em dias é obrigatória' })
    .int({ message: 'A validade em dias deve ser um número inteiro' })
    .positive({ message: 'A validade em dias deve ser um valor positivo' })
    .optional(),

  unitOfMeasure: z
    .string({ required_error: 'A unidade de medida é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  weight: z.coerce
    .number({ required_error: 'O peso é obrigatório' })
    .positive({ message: 'O peso deve ser um valor positivo' })
    .optional(),

  dimensions_height: z
    .string({ required_error: 'A altura é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  dimensions_width: z
    .string({ required_error: 'A largura é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  dimensions_depth: z
    .string({ required_error: 'A profundidade é obrigatória' })
    .min(1, { message: 'Mínimo de 1 caractere' })
    .optional(),

  manufacturer: z.string().optional(),

  batch: z.string().optional(),

  status: z
    .nativeEnum(StatusProduct, {
      required_error: 'O status é obrigatório',
    })
    .optional(),

  companyId: z
    .string({ required_error: 'O ID da empresa é obrigatório' })
    .uuid({ message: 'O ID da empresa deve ser um UUID válido' })
    .optional(),

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
})

export type UpdateProductType = z.infer<typeof updateProductSchema>
export type UpdateProductInput = z.input<typeof updateProductSchema>
export type UpdateProductOutput = z.output<typeof updateProductSchema>
