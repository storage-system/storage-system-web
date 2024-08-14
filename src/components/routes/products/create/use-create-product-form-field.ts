import { FormFieldsConstant } from '@/@types/form-field'
import {
  formattedStatusProduct,
  StatusProduct,
} from '@/constants/product/product-status-enum'
import { CreateProductType } from '@/validations/create-category-schema'

export function useCreateProductFormField() {
  const formattedStatusOptions = Object.values(StatusProduct).map((item) => ({
    label: formattedStatusProduct[item],
    value: item,
  }))

  const CREATE_PRODUCT_FORM_FIELD_CONSTANT: FormFieldsConstant<CreateProductType> =
    [
      [
        {
          name: 'name',
          type: 'text',
          className: 'col-span-12',
          label: 'Nome do produto',
          placeholder: 'Ex. Bobina de Aço',
        },
      ],
      [
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição do produto',
          placeholder: 'Digite uma breve descrição',
          className: 'col-span-12',
        },
      ],
      [
        {
          name: 'originalPrice',
          type: 'number',
          label: 'Preço original',
          placeholder: 'Ex. R$ 99,00',
          className: 'col-span-4',
        },
        {
          name: 'finalPrice',
          type: 'number',
          label: 'Preço final',
          placeholder: 'Ex. R$ 99,00',
          className: 'col-span-4',
        },
        {
          name: 'discountPercentage',
          type: 'number',
          label: 'Porcentagem de desconto',
          placeholder: 'Ex. 50%',
          className: 'col-span-4',
        },
      ],
      [
        {
          name: 'manufacturer',
          type: 'text',
          label: 'Fabricante',
          placeholder: 'Ex. ABC Indústria',
          className: 'col-span-3',
        },
        {
          name: 'batch',
          type: 'text',
          label: 'Lote',
          placeholder: 'Ex. Lote 1234',
          className: 'col-span-3',
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          placeHolder: 'Ex. Fora de estoque',
          options: formattedStatusOptions,
          className: 'col-span-3',
        },
        {
          name: 'categoryIds',
          type: 'text',
          label: 'Categorias',
          placeholder: 'Ex. Metais, Ferramentas',
          className: 'col-span-3',
        },
      ],
      [
        {
          name: 'validityInDays',
          type: 'text',
          label: 'Validade em dias',
          placeholder: 'Ex. 365',
          className: 'col-span-5',
        },
        {
          name: 'unitOfMeasure',
          type: 'text',
          label: 'Unidade de medida',
          placeholder: 'Ex. Kg, m³',
          className: 'col-span-7',
        },
      ],
      [
        {
          name: 'weight',
          type: 'number',
          label: 'Peso',
          placeholder: 'Ex. 50 kg',
          className: 'col-span-3',
        },
        {
          name: 'dimensionsHeight',
          type: 'number',
          label: 'Altura',
          placeholder: 'Ex. 1,5 m',
          className: 'col-span-3',
        },
        {
          name: 'dimensionsWidth',
          type: 'number',
          label: 'Largura',
          placeholder: 'Ex. 0,75 m',
          className: 'col-span-3',
        },
        {
          name: 'dimensionsDepth',
          type: 'number',
          label: 'Comprimento',
          placeholder: 'Ex. 2,0 m',
          className: 'col-span-3',
        },
      ],
    ]

  return { CREATE_PRODUCT_FORM_FIELD: CREATE_PRODUCT_FORM_FIELD_CONSTANT }
}
