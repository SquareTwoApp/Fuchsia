import { DataField, EntityModel, Import, ServerAuth } from "../types";
import { checkTypeForPrimitive } from "./check-primitives";
import { convertImports } from "./converters";
import { getModelName, generateConnections } from "./graphql-entity-generator";

export function generateAuthenticationResolver(
  serverAuth: ServerAuth,
  models: EntityModel[]
) {
  const importsBuilder: Import = {}
  const classBuilder = [] as string[]
  const authModel = models.find(
    m => m._id.toString() === serverAuth.tableId.toString()
  )
  if (authModel) {
    importsBuilder['apollo-server'] = {
      ApolloError: { type: 'single' },
    }
    importsBuilder['mongoose'] = {
      ObjectId: { type: 'single' },
    }
    importsBuilder['type-graphql'] = {
      Arg: { type: 'single' },
      Ctx: { type: 'single' },
      Mutation: { type: 'single' },
      Query: { type: 'single' },
      Resolver: { type: 'single' },
      Int: { type: 'single' },
      PubSub: { type: 'single' },
      Publisher: { type: 'single' },
      Subscription: { type: 'single' },
      Field: { type: 'single' },
      Root: { type: 'single' },
      ObjectType: { type: 'single' },
    }
    importsBuilder['typedi'] = {
      Service: { type: 'single' },
    }
    importsBuilder['../types'] = {
      Context: { type: 'single' },
    }
    importsBuilder['../utils/object-id.scalar'] = {
      ObjectIdScalar: { type: 'single' },
    }
    importsBuilder[`../${authModel.name}/${authModel.name}.entity`] = {
      [authModel.name]: { type: 'single' },
    }
    importsBuilder[`../${authModel.name}/${authModel.name}.input`] = {
      [`Create${authModel.name}Input`]: { type: 'single' },
    }
    importsBuilder[`../Models`] = {
      [`${authModel.name}Model`]: { type: 'single' },
    }
    importsBuilder['argon2'] = {
      hash: { type: 'single' },
      verify: { type: 'single' },
    }
    importsBuilder['../utils/consts'] = {
      COOKIE_NAME: { type: 'single' },
    }

    const usernameField = authModel.fields.find(
      f => f._id.toString() === serverAuth.usernameFieldId.toString()
    )
    const passwordField = authModel.fields.find(
      f => f._id.toString() === serverAuth.passwordFieldId.toString()
    )
    if (!usernameField || !passwordField) {
      throw new Error('Misconfigured')
    }
    classBuilder.push(``)
    classBuilder.push(`@Service()`)
    classBuilder.push(`@Resolver()`)
    classBuilder.push('export class AuthenticationResolver {')
    // Me resolver
    classBuilder.push(`  @Query(() => ${authModel.name}, { nullable: true })`)
    classBuilder.push(`  async me(@Ctx() ctx: Context) {`)
    classBuilder.push(`    if (!ctx.req.session.email) {`)
    classBuilder.push(`      throw new ApolloError("Unauthorized");`)
    classBuilder.push(`    }`)
    classBuilder.push(
      `  return ${authModel.name}Model.findOne({ ${usernameField.fieldName}: ctx.req.session.email });`
    )
    classBuilder.push(`  }`)
    classBuilder.push(``)
    // Login resolver
    classBuilder.push(`  @Mutation(() => String)`)
    classBuilder.push(`  async login(`)
    classBuilder.push(
      `    @Arg("${usernameField.fieldName}") ${usernameField.fieldName}: string,`
    )
    classBuilder.push(
      `    @Arg("${passwordField.fieldName}") ${passwordField.fieldName}: string,`
    )
    classBuilder.push(`    @Ctx() ctx: Context`)
    classBuilder.push(`  ) {`)
    classBuilder.push(
      `    const user = await ${authModel.name}Model.findOne({ email: ${serverAuth.usernameCaseSensitive
        ? usernameField.fieldName
        : `${usernameField.fieldName}.toLowerCase()`
      } });`
    )
    classBuilder.push(`    if (!user) {`)
    classBuilder.push(`      throw new ApolloError("Login error");`)
    classBuilder.push(`    }`)
    classBuilder.push(
      `    const valid = await verify(user.${passwordField.fieldName}, ${passwordField.fieldName});`
    )
    classBuilder.push(`    if (!valid) {`)
    classBuilder.push(`      throw new ApolloError("Login error");`)
    classBuilder.push(`    }`)
    classBuilder.push(
      `    ctx.req.session.email = user.${usernameField.fieldName};`
    )
    classBuilder.push(`    ctx.req.session.userId = user._id;`)
    classBuilder.push(`    return ctx.req.session.id;`)
    classBuilder.push(`  }`)
    classBuilder.push('')
    classBuilder.push(`
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context) {
    return new Promise((resolve) =>
      ctx.req.session.destroy((err) => {
        ctx.res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
    `)
    // register resolver
    classBuilder.push(`  @Mutation(() => String)`)
    classBuilder.push(`  async register(`)
    classBuilder.push(
      `    @Arg("input", type => Create${authModel.name}Input) input: Create${authModel.name}Input,`
    )
    classBuilder.push(`    @Ctx() ctx: Context`)
    classBuilder.push(`  ) {`)

    classBuilder.push(`    const user = await ${authModel.name}Model.create({`)
    classBuilder.push(`      ...input,`)
    authModel.fields
      .filter(f => f.isHashed)
      .forEach(f =>
        classBuilder.push(
          `        ${f.fieldName}: await hash(input.${f.fieldName}),`
        )
      )
    classBuilder.push(`    })`)
    classBuilder.push(`    if (!user) {`)
    classBuilder.push(`      throw new ApolloError("Registration error");`)
    classBuilder.push(`    }`)
    classBuilder.push(
      `    ctx.req.session.email = user.${usernameField.fieldName};`
    )
    classBuilder.push(`    ctx.req.session.userId = user._id;`)
    classBuilder.push(`    return ctx.req.session.id;`)
    classBuilder.push(`  }`)

    classBuilder.push('}')
  }
  return convertImports(importsBuilder).concat(classBuilder.join('\n'))
}

export function generateResolver(model: EntityModel, models: EntityModel[]) {
  const importBuilder: Import = {}
  importBuilder['apollo-server'] = {
    ApolloError: { type: 'single' },
  }
  importBuilder['mongoose'] = {
    ObjectId: { type: 'single' },
  }
  importBuilder['type-graphql'] = {
    Arg: { type: 'single' },
    Ctx: { type: 'single' },
    Mutation: { type: 'single' },
    Query: { type: 'single' },
    Resolver: { type: 'single' },
    Int: { type: 'single' },
    PubSub: { type: 'single' },
    Publisher: { type: 'single' },
    Subscription: { type: 'single' },
    Field: { type: 'single' },
    Root: { type: 'single' },
    ObjectType: { type: 'single' },
  }
  importBuilder['typedi'] = {
    Service: { type: 'single' },
  }
  importBuilder['../types'] = {
    Context: { type: 'single' },
  }
  importBuilder['../utils/object-id.scalar'] = {
    ObjectIdScalar: { type: 'single' },
  }
  importBuilder['../utils/filter-parser'] = {
    FilterParser: { type: 'default' },
  }
  importBuilder[`./${model.name}.entity`] = {
    [model.name]: { type: 'single' },
    [`Model${model.name}Connection`]: { type: 'single' },
  }
  importBuilder[`./${model.name}.input`] = {
    [`Create${model.name}Input`]: { type: 'single' },
    [`Update${model.name}Input`]: { type: 'single' },
    [`Delete${model.name}Input`]: { type: 'single' },
    [`Model${model.name}ConditionalInput`]: { type: 'single' },
    [`Model${model.name}FilterInput`]: { type: 'single' },
  }
  importBuilder['../Models'] = {
    [`${model.name}Model`]: { type: 'single' },
  }
  importBuilder['../common.input'] = {
    ModelSortDirection: { type: 'single' },
  }
  if (model.fields.some(f => f.isHashed)) {
    importBuilder['argon2'] = {
      hash: { type: 'single' },
      verify: { type: 'single' },
    }
  }
  const classBuilder = ['\n']
  classBuilder.push(`
@ObjectType()
class ${model.name}SubscriptionPayload {
  @Field()
  type!: "CREATE" | "DELETE" | "UPDATE";
  @Field((type) => [ObjectIdScalar])
  _ids!: ObjectId[];
  @Field((type) => [${model.name}])
  items!: ${model.name}[];
}
  `)
  classBuilder.push(`@Service()`)
  classBuilder.push(`@Resolver(of => ${model.name})`)
  classBuilder.push(`export class ${model.name}Resolver {`)
  // Get Query
  classBuilder.push(``)
  classBuilder.push(`  @Query(retuns => ${model.name})`)
  classBuilder.push(
    `  async get${model.name}(@Arg('_id', type => ObjectIdScalar) _id: ObjectId) {`
  )
  classBuilder.push(`    return ${model.name}Model.findById(_id)`)
  classBuilder.push(`  }`)
  // List Query
  classBuilder.push(``)
  classBuilder.push(`  @Query(retuns => Model${model.name}Connection)`)
  classBuilder.push(`  async list${model.name}(
    @Arg('filter', type => Model${model.name}FilterInput, { nullable: true }) filter: Model${model.name}FilterInput, 
    @Arg('sortDirection', type => ModelSortDirection, { nullable: true }) sortDirection: ModelSortDirection, 
    @Arg('limit', type => Int, { nullable: true }) limit: number, 
    @Arg('nextToken', { nullable: true }) nextToken: String, 
    @Ctx() ctx: Context) {`)

  classBuilder.push(
    `    const items = await ${model.name}Model.find(FilterParser()(filter) || {}).limit(limit || 0)`
  )
  classBuilder.push(`  return { nextToken: null, items }`)
  classBuilder.push(`  }`)
  // Create Query
  classBuilder.push('')
  classBuilder.push(`  @Mutation(returns => ${model.name})`)
  classBuilder.push(`  async create${model.name}(
    @Arg('input', type => Create${model.name}Input) input: Create${model.name
    }Input, 
    @Arg('condition', type => Model${model.name
    }ConditionalInput, { nullable: true }) condition: Model${model.name
    }ConditionalInput,
    @PubSub("${model.name.toUpperCase()}_CHANGE") publish: Publisher<${model.name
    }SubscriptionPayload>,
    @Ctx() ctx: Context) {`)
  classBuilder.push(`    const newItem = await ${model.name}Model.create({`)
  classBuilder.push(`      ...input,`)
  model.fields
    .filter(f => f.isHashed)
    .forEach(f =>
      classBuilder.push(
        `        ${f.fieldName}: await hash(input.${f.fieldName}),`
      )
    )
  classBuilder.push(`    })`)
  classBuilder.push(
    `    publish({ type: 'CREATE', _ids: [newItem._id], items: [newItem] })`
  )
  classBuilder.push(`    return newItem`)
  classBuilder.push(`  }`)
  // Delete Query
  classBuilder.push('')
  classBuilder.push(`  @Mutation(returns => ${model.name}, { nullable: true })`)
  classBuilder.push(`  async delete${model.name}(
    @Arg('input', type => Delete${model.name}Input) input: Delete${model.name
    }Input, 
    @Arg('condition', type => Model${model.name
    }ConditionalInput, { nullable: true }) condition: Model${model.name
    }ConditionalInput,
    @PubSub("${model.name.toUpperCase()}_CHANGE") publish: Publisher<${model.name
    }SubscriptionPayload>,
    @Ctx() ctx: Context) {`)
  classBuilder.push(
    `    const deletedItem = await ${model.name}Model.findByIdAndDelete(input._id)`
  )
  classBuilder.push(`    if(deletedItem) {`)
  classBuilder.push(
    `      publish({ type: 'DELETE', _ids: [deletedItem._id], items: [] })`
  )
  classBuilder.push(`      return deletedItem`)
  classBuilder.push(`    }`)
  classBuilder.push(`  }`)
  classBuilder.push('')
  // Update Query
  classBuilder.push(`  @Mutation(returns => ${model.name}, { nullable: true })`)
  classBuilder.push(`  async update${model.name}(
    @Arg('input', type => Update${model.name}Input) input: Update${model.name
    }Input, 
    @Arg('condition', type => Model${model.name
    }ConditionalInput, { nullable: true }) condition: Model${model.name
    }ConditionalInput,
    @PubSub("${model.name.toUpperCase()}_CHANGE") publish: Publisher<${model.name
    }SubscriptionPayload>,
    @Ctx() ctx: Context) {`)
  classBuilder.push(`    const updatedItem = await ${model.name}Model.findOneAndUpdate(FilterParser()(condition) || {}, 
    { 
      $set: {
        ...input,`)
  model.fields
    .filter(f => f.isHashed)
    .forEach(f =>
      classBuilder.push(
        `      ${f.fieldName}: input.${f.fieldName} ? await hash(input.${f.fieldName}) : undefined,`
      )
    )
  classBuilder.push(`    }}, { returnDocument: 'after' })`)
  classBuilder.push(`    if (updatedItem) {`)
  classBuilder.push(
    `      publish({ type: "UPDATE", _ids: [updatedItem._id], items: [updatedItem] })`
  )
  classBuilder.push(`      return updatedItem`)
  classBuilder.push(`    }`)
  classBuilder.push(`  }`)

  // subscriptions
  classBuilder.push('')
  classBuilder.push(`  @Subscription(returns => ${model.name
    }SubscriptionPayload, {
    topics: "${model.name.toUpperCase()}_CHANGE"
  })`)
  classBuilder.push(`  async on${model.name}Change(
    @Root() ${model.name}Subscription: ${model.name}SubscriptionPayload,
    @Arg('filter', type => Model${model.name}FilterInput, { nullable: true }) filter: Model${model.name}FilterInput, 
    @Ctx() ctx: any) {`)
  classBuilder.push(`    return ${model.name}Subscription`)
  classBuilder.push(`  }`)

  // field resolvers

  classBuilder.push(`}`)
  return convertImports(importBuilder).concat(classBuilder.join('\n'))
}
