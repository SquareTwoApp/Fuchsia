import { ApolloError } from 'apollo-server'
import { ObjectId } from 'mongoose'
import { Arg, Ctx, Mutation, Query, Resolver, Int, PubSub, Publisher, Subscription, Field, Root, ObjectType } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../types'
import { ObjectIdScalar } from '../utils/object-id.scalar'
import { User } from '../User/User.entity'
import { CreateUserInput } from '../User/User.input'
import { UserModel } from '../Models'
import { hash, verify } from 'argon2'
import { COOKIE_NAME } from '../utils/consts'
@Service()
@Resolver()
export class AuthenticationResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    if (!ctx.req.session.email) {
      throw new ApolloError("Unauthorized");
    }
  return UserModel.findOne({ email: ctx.req.session.email });
  }

  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ) {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new ApolloError("Login error");
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      throw new ApolloError("Login error");
    }
    ctx.req.session.email = user.email;
    ctx.req.session.userId = user._id;
    return ctx.req.session.id;
  }


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
    
  @Mutation(() => String)
  async register(
    @Arg("input", type => CreateUserInput) input: CreateUserInput,
    @Ctx() ctx: Context
  ) {
    const user = await UserModel.create({
      ...input,
        password: await hash(input.password),
    })
    if (!user) {
      throw new ApolloError("Registration error");
    }
    ctx.req.session.email = user.email;
    ctx.req.session.userId = user._id;
    return ctx.req.session.id;
  }
}