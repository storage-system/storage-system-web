export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '') // Remove any non-digit characters
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false // Verifica tamanho e repetições

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0

  return remainder === parseInt(cpf[10])
}
