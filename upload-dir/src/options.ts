export const toBoolean = (value: string): boolean | undefined => {
  if (!value) {
    return undefined
  }

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  throw new Error(`Invalid boolean|undefined: ${value}`)
}

export const toNumber = (value: string): number | undefined => {
  if (!value) {
    return undefined
  }

  const number = Number(value)
  if (number.toString() !== value) {
    throw new Error(`Invalid number: ${value}`)
  }
  return number
}

export const toString = (value: string): string => value
