import { FormFieldsConstant } from '@/@types/form-field'
import { CNPJMask, telMask } from '@/utils/masker'
import {
  createCompanySchema,
  CreateCompanyType,
} from '@/validations/create-company-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useCompanyRegistrationFormField({
  companyData,
}: {
  companyData?: CreateCompanyType
}) {
  const form = useForm<CreateCompanyType>({
    resolver: zodResolver(createCompanySchema),
  })

  const REGISTRATION_FORM_FIELD: FormFieldsConstant<CreateCompanyType> = [
    [
      {
        name: 'tradeName',
        label: 'Nome fantasia',
        className: 'col-span-6',
        placeholder: 'Ex: Empresa XYZ',
        type: 'text',
      },
      {
        name: 'corporateName',
        label: 'Razão Social',
        className: 'col-span-6',
        placeholder: 'Ex: Empresa XYZ Ltda',
        type: 'text',
      },
    ],
    [
      {
        name: 'cnpj',
        label: 'CNPJ',
        className: 'col-span-full',
        placeholder: 'Ex: 00.000.000/0000-00',
        type: 'masked',
        mask: CNPJMask,
      },
    ],
    [
      {
        name: 'email',
        label: 'Email empresarial',
        className: 'col-span-full',
        placeholder: 'Ex: contato@empresa.com',
        type: 'text',
      },
    ],
    [
      {
        name: 'contact',
        label: 'Contato',
        className: 'col-span-full',
        placeholder: 'Ex: (62) 9 9999 9999',
        type: 'masked',
        mask: telMask,
      },
    ],
  ]

  useEffect(() => {
    if (companyData) {
      form.setValue('tradeName', companyData.tradeName)
      form.setValue('corporateName', companyData.corporateName)
      form.setValue('cnpj', companyData.cnpj)
      form.setValue('email', companyData.email)
      form.setValue('contact', companyData.contact)
    }
  }, [companyData])

  return {
    form,
    REGISTRATION_FORM_FIELD,
  }
}
