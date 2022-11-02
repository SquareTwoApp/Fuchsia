import { ApolloError } from 'apollo-server'
import { ObjectId } from 'mongoose'
import { Arg, Ctx, Mutation, Query, Resolver, Int, PubSub, Publisher, Subscription, Field, Root, ObjectType } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../types'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import FilterParser from '../utils/filter-parser'
import { User, ModelUserConnection } from './User.entity'
import { CreateUserInput, UpdateUserInput, DeleteUserInput, ModelUserConditionalInput, ModelUserFilterInput } from './User.input'
import { UserModel } from '../Models'
import { ModelSortDirection } from '../common.input'
import { hash, verify } from 'argon2'


@ObjectType()
class UserSubscriptionPayload {
  @Field()
  type!: "CREATE" | "DELETE" | "UPDATE";
  @Field((type) => [ObjectIdScalar])
  _ids!: ObjectId[];
  @Field((type) => [User])
  items!: User[];
}
  
@Service()
@Resolver(of => User)
export class UserResolver {

  @Query(retuns => User)
  async getUser(@Arg('_id', type => ObjectIdScalar) _id: ObjectId) {
    return UserModel.findById(_id)
  }

  @Query(retuns => ModelUserConnection)
  async listUser(
    @Arg('filter', type => ModelUserFilterInput, { nullable: true }) filter: ModelUserFilterInput, 
    @Arg('sortDirection', type => ModelSortDirection, { nullable: true }) sortDirection: ModelSortDirection, 
    @Arg('limit', type => Int, { nullable: true }) limit: number, 
    @Arg('nextToken', { nullable: true }) nextToken: String, 
    @Ctx() ctx: Context) {
    const items = await UserModel.find(FilterParser()(filter) || {}).limit(limit || 0)
  return { nextToken: null, items }
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('input', type => CreateUserInput) input: CreateUserInput, 
    @Arg('condition', type => ModelUserConditionalInput, { nullable: true }) condition: ModelUserConditionalInput,
    @PubSub("USER_CHANGE") publish: Publisher<UserSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const newItem = await UserModel.create({
      ...input,
        password: await hash(input.password),
    })
    publish({ type: 'CREATE', _ids: [newItem._id], items: [newItem] })
    return newItem
  }

  @Mutation(returns => User, { nullable: true })
  async deleteUser(
    @Arg('input', type => DeleteUserInput) input: DeleteUserInput, 
    @Arg('condition', type => ModelUserConditionalInput, { nullable: true }) condition: ModelUserConditionalInput,
    @PubSub("USER_CHANGE") publish: Publisher<UserSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const deletedItem = await UserModel.findByIdAndDelete(input._id)
    if(deletedItem) {
      publish({ type: 'DELETE', _ids: [deletedItem._id], items: [] })
      return deletedItem
    }
  }

  @Mutation(returns => User, { nullable: true })
  async updateUser(
    @Arg('input', type => UpdateUserInput) input: UpdateUserInput, 
    @Arg('condition', type => ModelUserConditionalInput, { nullable: true }) condition: ModelUserConditionalInput,
    @PubSub("USER_CHANGE") publish: Publisher<UserSubscriptionPayload>,
    @Ctx() ctx: Context) {
    const updatedItem = await UserModel.findOneAndUpdate(FilterParser()(condition) || {}, 
    { 
      $set: {
        ...input,
      password: input.password ? await hash(input.password) : undefined,
    }}, { returnDocument: 'after' })
    if (updatedItem) {
      publish({ type: "UPDATE", _ids: [updatedItem._id], items: [updatedItem] })
      return updatedItem
    }
  }

  @Subscription(returns => UserSubscriptionPayload, {
    topics: "USER_CHANGE"
  })
  async onUserChange(
    @Root() UserSubscription: UserSubscriptionPayload,
    @Arg('filter', type => ModelUserFilterInput, { nullable: true }) filter: ModelUserFilterInput, 
    @Ctx() ctx: any) {
    return UserSubscription
  }
}