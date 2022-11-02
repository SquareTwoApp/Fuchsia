import { EntityModel, DataField, Key, Import } from "../types"
import { checkTypeForPrimitive } from "./check-primitives"
import { convertImports } from "./converters"

export function getModelName(dataType: string, models: EntityModel[]) {
  const model = models.find(m => m._id.toString() === dataType)
  if (!model) {
    return dataType
  }
  return model.name
}

export function generateEntityField(field: DataField, models: EntityModel[]) {
  const fieldBuilder = [] as string[]
  let modelName: string = ''
  const isPrimitive = checkTypeForPrimitive(field.dataType)
  if (!isPrimitive) {
    modelName = getModelName(field.dataType, models)
  }
  if (!field.isHashed) {
    fieldBuilder.push(
      `  @Field(type => ${field.isList ? '[' : ''}${isPrimitive ? field.dataType : modelName
      }${field.isList ? ']' : ''}, { nullable: ${field.nullable} })`
    )
  }
  // TODO: Unique
  const propertyBuilder = {} as { [key: string]: string }
  if (!isPrimitive) {
    propertyBuilder.ref = `() => ${modelName}`
  }
  if (field.isList) {
    propertyBuilder.default = `[]`
  }
  if (field.isUnique) {
    propertyBuilder.unique = 'true'
  }
  propertyBuilder.nullable = `${field.nullable}`
  fieldBuilder.push(
    `  @Property({ ${Object.keys(propertyBuilder)
      .map(key => `${key}: ${propertyBuilder[key]}`)
      .join(', ')} })`
  )
  fieldBuilder.push(
    `  ${field.fieldName}!: ${isPrimitive ? (field.dataType.toLowerCase() === "int" ? "number" : field.dataType.toLowerCase()) : `Ref<${modelName}>`
    }${field.isList ? '[]' : ''}`
  )
  return fieldBuilder.join('\n')
}

export function generateObjectType(model: EntityModel, models: EntityModel[]) {
  const builder = []
  builder.push(`@ObjectType()`)
  builder.push(`export class ${model.name} {`)
  builder.push(`  @Field(type => ObjectIdScalar)`)
  builder.push(`  readonly _id!: ObjectId;`)
  builder.push(
        model.fields.map(
          field => generateEntityField(field, models)
        ).join('\n')
  )
  builder.push(`}`)
}

export function generateConnections(typename: string) {
  const builder = []
  builder.push(`@ObjectType()`)
  builder.push(`export class Model${typename}Connection {`)
  builder.push('')
  builder.push(`  @Field(type => [${typename}])`)
  builder.push(`  items!: ${typename}[]`)
  builder.push('')
  builder.push(`  @Field()`)
  builder.push(`  nextToken!: string`)
  builder.push(`}`)
  return builder.join('\n')
}


export function generateEntity(model: EntityModel, models: EntityModel[]) {
  const importsBuilder: Import = {}
  importsBuilder['mongoose'] = {
    ObjectId: { type: 'single' },
  }
  importsBuilder['type-graphql'] = {
    ObjectType: { type: 'single' },
    Field: { type: 'single' },
    //Primitives
    Int: { type: 'single' },
  }
  importsBuilder['@typegoose/typegoose'] = {
    prop: { type: 'single', rename: 'Property' },
  }
  importsBuilder['../utils/object-id.scalar'] = {
    ObjectIdScalar: { type: 'single' },
  }
  importsBuilder['../utils/ref-type'] = {
    Ref: { type: 'single' },
  }
  model.fields
    .filter(f => !checkTypeForPrimitive(f.dataType))
    .filter(f => (getModelName(f.dataType, models) !== model.name))
    .forEach(f => {
      const modelName = getModelName(f.dataType, models)
      importsBuilder[`../${modelName}/${modelName}.entity`] = {
        [modelName]: {
          type: 'single',
        },
      }
    })
  const classBuilder = ['\n'] as string[]
  classBuilder.push(generateConnections(model.name))
  classBuilder.push('')
  classBuilder.push(`@ObjectType()`)
  classBuilder.push(`export class ${model.name} {`)
  classBuilder.push('')
  classBuilder.push(`  @Field(type => ObjectIdScalar)`)
  classBuilder.push(`  readonly _id!: ObjectId;`)
  model.fields.forEach(field => {
    classBuilder.push('')
    classBuilder.push(generateEntityField(field, models))
  })
  classBuilder.push(`}`)
  return convertImports(importsBuilder).concat(classBuilder.join('\n'))
}