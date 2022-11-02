import { EntityModel } from "../types"

export async function generateModelFile(models: EntityModel[]) {
  const importsBuilder = [
    `import { getModelForClass } from "@typegoose/typegoose";`,
  ]
  const exportsBuilder = [] as string[]
  models.forEach(model => {
    importsBuilder.push(
      `import { ${model.name} } from "./${model.name}/${model.name}.entity";`
    )
    exportsBuilder.push(
      `export const ${model.name}Model = getModelForClass(${model.name});`
    )
  })
  return importsBuilder.concat(exportsBuilder).join('\n')
}