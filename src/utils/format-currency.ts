import { type FormEvent } from 'react'

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatMetricValue = (value?: number) =>
  priceFormatter.format(value ?? 0)

export function handleFormatCurrency(
  event: FormEvent<HTMLTextAreaElement | HTMLInputElement>,
) {
  let value = event.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')

  event.currentTarget.value = value
  return `R$ ${event.currentTarget.value}`
}

export function getValueFromCurrency(currencyValue: string): number {
  let value = currencyValue
  // remove currency symbol
  value = value.replace('R$', '')

  // remove spaces
  value = value.replace(' ', '')

  // remove dots and commas
  value = value.replace(',', '')
  value = value.replace('.', '')

  const numberValue = Number(value)

  if (isNaN(numberValue)) {
    throw new Error('Erro ao converter valor, tente novamente.')
  }

  if (currencyValue.includes(',')) {
    return Number(value) / 100
  }

  return Number(value)
}
