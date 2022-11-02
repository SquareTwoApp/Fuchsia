import { expect } from 'chai'
import { testData } from './data'
import { 
  generateCreateInput, 
  generateUpdateInput, 
  generateDeleteInput, 
  generateConditionalInput,
  generateFilterInput
} from '../src/utils/graphql-input-generator'

describe('Codeblock Generator', () => {
  const userModel = testData.serverConfig.apiConfig.models.find(m => m.name === 'User')
  it('should generate a create input class', () => {
    const createInputCodeblock = generateCreateInput({
      typename: 'User',
      // @ts-ignore
      keys: userModel?.fields
    })
    expect(createInputCodeblock).to.be.equal(createInputCodeblockGoal)
  })
  it('should generate a update input class', () => {
    const createUpdateCodeblock = generateUpdateInput({
      typename: 'User',
      // @ts-ignore
      keys: userModel?.fields
    })
    expect(createUpdateCodeblock).to.be.equal(createUpdateCodeblockGoal)
  })
  it('should generate a delete input class', () => {
    const createDeleteCodeblock = generateDeleteInput({ typename: 'User'})
    expect(createDeleteCodeblock).to.be.equal(createDeleteCodeblockGoal)
  })
  it('should generate a conditional input class', () => {
    const createConditionalCodeblock = generateConditionalInput({
      typename: 'User',
      // @ts-ignore
      keys: userModel?.fields
    })
    expect(createConditionalCodeblock).to.be.equal(createConditionalCodeblockGoal)
  })
  it('should properly generate a simple graphql FilterInput', async () => {
    const filter = generateFilterInput({
      typename: 'User',
      keys: []
    })
    expect(filter).to.be.equal([
`@InputType()`,
`export class ModelUserFilterInput {`,
'',
`  @Field(type => ObjectIdScalar, { nullable: true })`,
`  _id!: ObjectId`,
'',
`  @Field(type => [ModelUserFilterInput], { nullable: true })`,
`  and?: ModelUserFilterInput[]`,
'',
`  @Field(type => [ModelUserFilterInput], { nullable: true })`,
`  or?: ModelUserFilterInput[]`,
'',
`  @Field(type => ModelUserFilterInput, { nullable: true })`,
`  not?: ModelUserFilterInput`,
`}`
].join('\n'))
  })
  it('should properly generate a complex graphql FilterInput', async () => {
    const filter = generateFilterInput({
      typename: 'User',
      keys: [{
        dataType: 'Organization',
        fieldName: 'org',
        nullable: true
      }, {
        dataType: 'Project',
        fieldName: 'projects',
        nullable: true
      }]
    })
    expect(filter).to.be.equal([
`@InputType()`,
`export class ModelUserFilterInput {`,
'',
`  @Field(type => ObjectIdScalar, { nullable: true })`,
`  _id!: ObjectId`,
'',
`  @Field(type => ModelOrganizationInput, { nullable: true })`,
`  org?: ModelOrganizationInput`,
'',
`  @Field(type => ModelProjectInput, { nullable: true })`,
`  projects?: ModelProjectInput`,
'',
`  @Field(type => [ModelUserFilterInput], { nullable: true })`,
`  and?: ModelUserFilterInput[]`,
'',
`  @Field(type => [ModelUserFilterInput], { nullable: true })`,
`  or?: ModelUserFilterInput[]`,
'',
`  @Field(type => ModelUserFilterInput, { nullable: true })`,
`  not?: ModelUserFilterInput`,
`}`
].join('\n'))
  })
})

const createInputCodeblockGoal = `@InputType()
export class CreateUserInput {

  @Field({ nullable: false })
  email!: string

  @Field({ nullable: false })
  password!: string

  @Field({ nullable: true })
  user_type?: string

  @Field({ nullable: true })
  asdf?: string
}`

const createUpdateCodeblockGoal = `@InputType()
export class UpdateUserInput {

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  user_type?: string

  @Field({ nullable: true })
  asdf?: string
}`

const createDeleteCodeblockGoal = `@InputType()
export class DeleteUserInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId
}`

const createConditionalCodeblockGoal = `@InputType()
export class ModelUserConditionalInput {
  @Field(type => ObjectIdScalar)
  _id!: ObjectId

  @Field(type => ModelStringInput, { nullable: true })
  email?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  password?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  user_type?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  asdf?: ModelStringInput

  @Field(type => [ModelUserConditionalInput], { nullable: true })
  and?: ModelUserConditionalInput[]

  @Field(type => [ModelUserConditionalInput], { nullable: true })
  or?: ModelUserConditionalInput[]

  @Field(type => [ModelUserConditionalInput], { nullable: true })
  not?: ModelUserConditionalInput
}`

const createFilterInputGoal = `@InputType()
export class ModelUserFilterInput {

  @Field(type => ObjectIdScalar, { nullable: true })
  _id!: ObjectId

  @Field(type => ModelStringInput, { nullable: true })
  email?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  password?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  user_type?: ModelStringInput

  @Field(type => ModelStringInput, { nullable: true })
  asdf?: ModelStringInput

  @Field(type => [ModelUserFilterInput], { nullable: true })
  and?: ModelUserFilterInput[]

  @Field(type => [ModelUserFilterInput], { nullable: true })
  or?: ModelUserFilterInput[]

  @Field(type => ModelUserFilterInput, { nullable: true })
  not?: ModelUserFilterInput
}`