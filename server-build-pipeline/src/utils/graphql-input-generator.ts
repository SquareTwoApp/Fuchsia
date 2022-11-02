import { DataField, EntityModel, Import, Key } from "../types"
import { checkTypeForPrimitive, checkTypeForSpecial } from "./check-primitives"
import { convertImports } from "./converters"
import { getModelName } from "./graphql-entity-generator"

export function generateCreateInput({
  typename,
  keys,
}: {
  typename: string
  keys: DataField[]
}) {
  const builder = []
  builder.push(`@InputType()`)
  builder.push(`export class Create${typename}Input {`)
  keys.forEach(key => {
    builder.push('')
    const isPrimitive = checkTypeForPrimitive(key.dataType)
    if (isPrimitive) {
      builder.push(`  @Field({ nullable: ${key.nullable} })`)
      builder.push(`  ${key.fieldName}${key.nullable ? '?' : '!' }: ${(key.dataType.toLowerCase() === "int" ? "number" : key.dataType.toLowerCase())}`)
    } else {
      switch (key.dataType) {
        case 'FileUpload':
          builder.push(`  @Field(type => GraphQLUpload, { nullable: ${key.nullable} })`)
          builder.push(`  ${key.fieldName}${key.nullable ? '?' : '!'}: FileUpload`)
          break
      }
      const isSpecial = checkTypeForSpecial(key.dataType)
      if (isSpecial) {
        // TODO: Support files and location
      }
    }
  })
  builder.push(`}`)
  return builder.join('\n')
}

export function generateUpdateInput({
  typename,
  keys,
}: {
  typename: string
  keys: DataField[]
}) {
  const builder = []
  builder.push(`@InputType()`)
  builder.push(`export class Update${typename}Input {`)
  keys.forEach(key => {
    builder.push('')
    builder.push(`  @Field({ nullable: true })`)
    builder.push(`  ${key.fieldName}?: ${(key.dataType.toLowerCase() === "int" ? "number" : key.dataType.toLowerCase())}`)
  })
  builder.push(`}`)
  return builder.join('\n')
}

export function generateDeleteInput({ typename }: { typename: string }) {
  const builder = []
  builder.push(`@InputType()`)
  builder.push(`export class Delete${typename}Input {`)
  builder.push(`  @Field(type => ObjectIdScalar)`)
  builder.push(`  _id!: ObjectId`)
  builder.push(`}`)
  return builder.join('\n')
}

export function generateConditionalInput({
  typename,
  keys,
}: {
  typename: string
  keys: DataField[]
}) {
  const builder = []
  builder.push(`@InputType()`)
  builder.push(`export class Model${typename}ConditionalInput {`)
  builder.push(`  @Field(type => ObjectIdScalar)`)
  builder.push(`  _id!: ObjectId`)
  keys.forEach(key => {
    builder.push('')
    builder.push(`  @Field(type => Model${key.dataType}Input, { nullable: true })`)
    builder.push(`  ${key.fieldName}?: Model${key.dataType}Input`)
  })
  builder.push('')
  builder.push(`  @Field(type => [Model${typename}ConditionalInput], { nullable: true })`)
  builder.push(`  and?: Model${typename}ConditionalInput[]`)
  builder.push('')
  builder.push(`  @Field(type => [Model${typename}ConditionalInput], { nullable: true })`)
  builder.push(`  or?: Model${typename}ConditionalInput[]`)
  builder.push('')
  builder.push(`  @Field(type => [Model${typename}ConditionalInput], { nullable: true })`)
  builder.push(`  not?: Model${typename}ConditionalInput`)
  builder.push(`}`)
  return builder.join('\n')
}

export function generateFilterInput({
  typename,
  keys,
}: {
  typename: string
  keys: Key[]
}) {
  const builder = []
  builder.push(`@InputType()`)
  builder.push(`export class Model${typename}FilterInput {`)
  builder.push('')
  builder.push(`  @Field(type => ObjectIdScalar, { nullable: true })`)
  builder.push(`  _id!: ObjectId`)
  keys.forEach(key => {
    builder.push('')
    builder.push(`  @Field(type => Model${key.dataType}Input, { nullable: true })`)
    builder.push(`  ${key.fieldName}?: Model${key.dataType}Input`)
  })
  builder.push('')
  builder.push(`  @Field(type => [Model${typename}FilterInput], { nullable: true })`)
  builder.push(`  and?: Model${typename}FilterInput[]`)
  builder.push('')
  builder.push(`  @Field(type => [Model${typename}FilterInput], { nullable: true })`)
  builder.push(`  or?: Model${typename}FilterInput[]`)
  builder.push('')
  builder.push(`  @Field(type => Model${typename}FilterInput, { nullable: true })`)
  builder.push(`  not?: Model${typename}FilterInput`)
  builder.push(`}`)
  return builder.join('\n')
}

export function generateInputFile(model: EntityModel, models: EntityModel[]) {
  const importsBuilder: Import = {}
  importsBuilder['type-graphql'] = {
    Field: { type: 'single' },
    InputType: { type: 'single' },
  }
  importsBuilder['mongoose'] = {
    ObjectId: { type: 'single' },
  }
  importsBuilder['../utils/object-id.scalar'] = {
    ObjectIdScalar: { type: 'single' },
  }
  importsBuilder[`./${model.name}.entity`] = {
    [model.name]: { type: 'single' },
  }
  const fields = model.fields
    .filter(f => checkTypeForPrimitive(f.dataType))
    .map(f => ({
      ...f,
      dataType: getModelName(f.dataType, models),
    }))
  fields.forEach(f => {
    if (!importsBuilder[`../common.input`]) {
      importsBuilder[`../common.input`] = {}
    }
    importsBuilder[`../common.input`][`Model${f.dataType}Input`] = {
      type: 'single',
    }
  })
  const classBuilder = []
  classBuilder.push('\n')
  classBuilder.push(
    generateCreateInput({
      typename: model.name,
      keys: fields,
    })
  )
  classBuilder.push('\n')
  classBuilder.push(
    generateUpdateInput({
      typename: model.name,
      keys: fields,
    })
  )
  classBuilder.push('\n')
  classBuilder.push(
    generateDeleteInput({
      typename: model.name,
    })
  )
  classBuilder.push('\n')
  classBuilder.push(
    generateConditionalInput({
      typename: model.name,
      keys: fields,
    })
  )
  classBuilder.push('\n')
  classBuilder.push(
    generateFilterInput({
      typename: model.name,
      keys: fields,
    })
  )
  return convertImports(importsBuilder).concat(classBuilder.join('\n'))
}