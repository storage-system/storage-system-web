import { FormFieldsConstant } from '@/@types/form-field'
import { toast } from '@/components/ui/use-toast'
import { addressQueryKey } from '@/constants/query-key/address-query-key'
import { useAddressService } from '@/services/address-service'
import { zipCodeMask } from '@/utils/masker'

import {
  createCompanyAddressSchema,
  CreateCompanyAddressType,
} from '@/validations/create-company-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounceValue } from 'usehooks-ts'

export function useAddressRegistrationFormField({
  companyAdressData,
}: {
  companyAdressData?: CreateCompanyAddressType
}) {
  const [fillFieldsManually, setFillFieldsManually] = useState(true)

  const form = useForm<CreateCompanyAddressType>({
    resolver: zodResolver(createCompanyAddressSchema),
  })

  const { addressService } = useAddressService()

  const zipCode = form.watch('zipCode')
  const [debouncedZipCode] = useDebounceValue(zipCode, 1500)

  const { data: addressData } = useQuery({
    queryKey: [addressQueryKey.GET_ADDRESS_BY_ZIP_CODE, debouncedZipCode],
    queryFn: handleGetAddressByZipCode,
  })

  async function handleGetAddressByZipCode() {
    try {
      if (zipCode && zipCode.length === 8) {
        setFillFieldsManually(true)
        return await addressService(debouncedZipCode)
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        description:
          'Não foi possivel encontrar o cep fornecido preencha os dados manualmente',
      })
      setFillFieldsManually(false)
      return null
    }
  }

  const REGISTRATION_FORM_FIELD: FormFieldsConstant<CreateCompanyAddressType> =
    [
      [
        {
          name: 'country',
          label: 'País',
          className: 'col-span-6',
          placeholder: 'Ex: Brasil',
          type: 'text',
        },
        {
          name: 'zipCode',
          label: 'CEP',
          className: 'col-span-6',
          placeholder: 'Ex: 12345-678',
          type: 'masked',
          mask: zipCodeMask,
        },
      ],
      [
        {
          name: 'street',
          label: 'Rua',
          className: 'col-span-8',
          placeholder: 'Ex: Avenida Paulista',
          type: 'text',
          disabled: fillFieldsManually,
        },
        {
          name: 'neighborhood',
          label: 'Bairro',
          className: 'col-span-4',
          placeholder: 'Ex: Bela Vista',
          type: 'text',
          disabled: fillFieldsManually,
        },
      ],
      [
        {
          name: 'city',
          label: 'Cidade',
          className: 'col-span-4',
          placeholder: 'Ex: São Paulo',
          type: 'text',
          disabled: fillFieldsManually,
        },
        {
          name: 'state',
          label: 'Estado',
          className: 'col-span-4',
          placeholder: 'Ex: SP',
          type: 'text',
          disabled: fillFieldsManually,
        },
        {
          name: 'number',
          label: 'Número',
          className: 'col-span-4',
          placeholder: 'Ex: 123',
          type: 'text',
        },
      ],
      [
        {
          name: 'complement',
          label: 'Complemento',
          className: 'col-span-12',
          placeholder: 'Ex: Apto 101',
          type: 'text',
        },
      ],
    ]

  useEffect(() => {
    if (addressData) {
      form.setValue('state', addressData.state)
      form.setValue('neighborhood', addressData.neighborhood)
      form.setValue('street', addressData.street)
      form.setValue('city', addressData.city)
    }
  }, [addressData])

  useEffect(() => {
    if (companyAdressData) {
      form.setValue('country', companyAdressData.country)
      form.setValue('zipCode', companyAdressData.zipCode)
      form.setValue('state', companyAdressData.state)
      form.setValue('neighborhood', companyAdressData.neighborhood)
      form.setValue('street', companyAdressData.street)
      form.setValue('city', companyAdressData.city)
      form.setValue('number', companyAdressData.number)
      form.setValue('complement', companyAdressData.complement)
    }
  }, [companyAdressData])

  return {
    form,
    REGISTRATION_FORM_FIELD,
  }
}
