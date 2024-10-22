import axios, { AxiosError, HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { z, ZodError } from 'zod'

export interface Address {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

const urlParamValidation = z.coerce.number()

export async function GET(
  request: NextRequest,
  { params: { cep } }: { params: { cep: string } },
) {
  try {
    const validatedCep = urlParamValidation.parse(cep)

    const url = new URL(
      `/ws/${validatedCep}/json/`,
      process.env.NEXT_PUBLIC_CEP_API_URL,
    )
    const { data } = await axios.get<Address>(url.toString())

    const formattedAddress = {
      zipcode: data.cep.replace(/\D/g, ''),
      street: data.logradouro,
      complement: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      region: data.regiao,
    }

    return NextResponse.json(
      { ...formattedAddress },
      { status: HttpStatusCode.Ok },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: Number(error.code) ?? HttpStatusCode.NotFound },
      )
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: JSON.parse(error.message) },
        { status: HttpStatusCode.BadRequest },
      )
    }
  }
}
