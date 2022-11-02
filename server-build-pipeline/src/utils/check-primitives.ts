export function checkTypeForPrimitive(type: string) {
  switch (type) {
    case 'ID':
    case 'String':
    case 'Boolean':
    case 'Int':
      return true
  }
  return false
}

export function checkTypeForSpecial(type: string) {
  switch (type) {
    case 'FileUpload':
    case 'GeoLocation':
      return true
  }
  return false
}
