export const toBoolean = (value: string): boolean => {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  throw new Error(`Invalid boolean: ${value}`)
}

export const toNumber = (value: string): number => {
  const number = Number(value)
  if (number.toString() !== value) {
    throw new Error(`Invalid number: ${value}`)
  }
  return number
}

export const toString = (value: string): string => value
