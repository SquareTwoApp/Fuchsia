import { Import } from "../types"

export function convertImports(imports: Import) {
  return Object.keys(imports)
    .map(packageKey => {
      const mainBuilder = []
      const partsBuilder = []
      const defaultsBuilder = []
      const singlesBuilder = []
      const defaults = Object.keys(imports[packageKey])
        .filter(importKey => imports[packageKey][importKey].type === 'default')
        .join(', ')
      let rest = Object.keys(imports[packageKey])
        .filter(importKey => imports[packageKey][importKey].type !== 'default')
        .map(importKey => {
          if (imports[packageKey][importKey].rename) {
            return `${importKey} as ${imports[packageKey][importKey].rename}`
          }
          return importKey
        })
        .join(', ')
      if (defaults) {
        partsBuilder.push(defaults)
      }
      if (rest) {
        rest = `{ ${rest} }`
        partsBuilder.push(rest)
      }
      mainBuilder.push(`import`)
      mainBuilder.push(partsBuilder.join(', '))
      mainBuilder.push(`from '${packageKey}'`)
      return mainBuilder.join(' ')
    })
    .join('\n')
}