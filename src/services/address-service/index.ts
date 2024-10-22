import { AddressResponse } from '@/@types/address-response'
import axios from 'axios'

export function useAddressService() {
  async function addressService(zipCode: string) {
    const url = new URL(
      `/api/address/${zipCode}`,
      process.env.NEXT_PUBLIC_API_ROUTES_URL,
    )
    const { data } = await axios.get<AddressResponse>(url.toString())

    return data
  }

  return { addressService }
}
