export const parseHeaders = (headers: string): Record<string, string> => {
  if (!headers) {
    return {}
  }

  const result: Record<string, string> = {}

  for (const header of headers.trim().split('\n')) {
    const index = header.indexOf(':')
    const key = header.slice(0, index).trim()
    const value = header.slice(index + 1).trim()

    if (typeof result[key] === 'undefined') {
      result[key] = value
    } else {
      result[key] = result[key] + ',' + value
    }
  }

  return result
}
