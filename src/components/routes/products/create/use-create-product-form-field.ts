import { FormFieldsConstant } from '@/@types/form-field'
import {
  formattedStatusProduct,
  StatusProduct,
} from '@/constants/product/product-status-enum'
import { categoriesQueryKey } from '@/constants/query-key/categories-query-key'
import { useCategoriesService } from '@/services/categories'
import { CreateProductType } from '@/validations/create-category-schema_1'
import { useQuery } from '@tanstack/react-query'

export function useCreateProductFormField() {
  const { listCategoriesService } = useCategoriesService()

  const { data: categoryList } = useQuery({
    queryKey: [categoriesQueryKey.LIST_CATEGORIES],
    queryFn: async () => {
      const { items } = await listCategoriesService()
      return items
    },
  })

  const formattedCategoryList =
    categoryList?.map((category) => ({
      label: category.name,
      value: category.id,
    })) ?? []

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
          autoComplete: 'off',
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
          name: 'manufactureDate',
          type: 'date-single',
          label: 'Data de manufatura',
          placeholder: 'Selecione uma data',
          className: 'col-span-2',
        },
        {
          name: 'manufacturer',
          type: 'text',
          label: 'Fabricante',
          placeholder: 'Ex. ABC Indústria',
          className: 'col-span-2',
        },
        {
          name: 'batch',
          type: 'text',
          label: 'Lote',
          placeholder: 'Ex. Lote 1234',
          className: 'col-span-2',
        },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          placeHolder: 'Ex. Fora de estoque',
          options: formattedStatusOptions,
          className: 'col-span-2',
        },
        {
          name: 'categoryIds',
          type: 'combobox',
          label: 'Categorias',
          placeholder: 'Ex. Metais, Ferramentas',
          className: 'col-span-4',
          multiple: true,
          options: formattedCategoryList,
        },
      ],
      [
        {
          name: 'validityInDays',
          type: 'text',
          label: 'Validade em dias',
          placeholder: 'Ex. 365',
          className: 'col-span-5',
          autoComplete: 'off',
        },
        {
          name: 'quantityInStock',
          type: 'text',
          label: 'Quantidade no estoque',
          placeholder: 'Ex. 10',
          className: 'col-span-5',
          autoComplete: 'off',
        },
        {
          name: 'unitOfMeasure',
          type: 'text',
          label: 'Unidade de medida',
          placeholder: 'Ex. Kg, m³',
          className: 'col-span-2',
          autoComplete: 'off',
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
          name: 'dimensions_height',
          type: 'number',
          label: 'Altura',
          placeholder: 'Ex. 1,5 m',
          className: 'col-span-3',
        },
        {
          name: 'dimensions_width',
          type: 'number',
          label: 'Largura',
          placeholder: 'Ex. 0,75 m',
          className: 'col-span-3',
        },
        {
          name: 'dimensions_depth',
          type: 'number',
          label: 'Comprimento',
          placeholder: 'Ex. 2,0 m',
          className: 'col-span-3',
        },
      ],
    ]

  return { CREATE_PRODUCT_FORM_FIELD: CREATE_PRODUCT_FORM_FIELD_CONSTANT }
}
