import { FormFieldsConstant } from '@/@types/form-field'
import { CreateConfigurationsType } from '@/validations/create-configurations-schema'

export function useCreateConfigurationsFormField() {
  const CREATE_CONFIGURATIONS_FORM_FIELD: FormFieldsConstant<CreateConfigurationsType> =
    [
      [
        {
          name: 'daysBeforeOldStock',
          label: 'Dias antes do estoque antigo',
          className: 'col-span-6',
          placeholder: 'Ex: 30',
          type: 'number',
        },
        {
          name: 'warningDays',
          label: 'Dias de aviso',
          className: 'col-span-6',
          placeholder: 'Ex: 5',
          type: 'number',
        },
      ],

      [
        {
          name: 'reportFrequency',
          label: 'Frequência do Relatório',
          className: 'col-span-12',
          type: 'select',
          options: [
            { value: 'diary', label: 'Diário' },
            { value: 'weekly', label: 'Semanal' },
            { value: 'monthly', label: 'Mensal' },
          ],
        },
      ],
      [
        {
          name: 'emailNotification',
          label: 'Notificação por E-mail',
          className: 'col-span-6',
          type: 'switch',
        },
        {
          name: 'systemNotification',
          label: 'Notificação do Sistema',
          className: 'col-span-6',
          type: 'switch',
        },
      ],
      [
        {
          name: 'autoDiscardAfterExpiration',
          label: 'Descarte automático após expiração',
          className: 'col-span-6',
          type: 'switch',
        },
        {
          name: 'freeShippingOnOldStock',
          label: 'Frete grátis em estoque antigo',
          className: 'col-span-6',
          type: 'switch',
        },
      ],
    ]

  return {
    CREATE_CONFIGURATIONS_FORM_FIELD,
  }
}
