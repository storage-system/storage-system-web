export function getContrastTextColor(hex: string): string {
  if (!hex.startsWith('#')) return '#000'

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // cálculo de luminância relativa
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Se a luminância for baixa, retorna branco; caso contrário, preto
  return luminance > 0.6 ? '#000000' : '#ffffff'
}
