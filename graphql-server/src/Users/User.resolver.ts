import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Authorized,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";
import { OrganizationModel, UserModel } from "../Models";
import { Context, FieldError } from "../types";
import { User } from "./User.entity";
import { UserRole, UserStatus } from "./User.enum";
import { UserInput } from "./User.input";
import { hash, verify } from "argon2";
import { ApolloError } from "apollo-server";
import { COOKIE_NAME } from "../consts";
import { Service } from "typedi";
import { Organization } from "../Organizations/Organization.entity";

const passwordRegex =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/g;

@ObjectType()
export class LoginOutputType {
  @Field()
  sessionId!: string;
}

@Service()
@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context) {
    if (!ctx.req.session.email) {
      throw new ApolloError("Unauthorized");
    }
    return UserModel.findOne({ email: ctx.req.session.email });
  }

  @Mutation((returns) => User)
  async updateMe(@Arg("userInput") userInput: UserInput, @Ctx() ctx: Context) {
    if (!ctx.req.session.email) {
      throw new ApolloError("Unauthorized");
    }
    return UserModel.findOneAndUpdate(
      { email: ctx.req.session.email },
      { ...userInput },
      {
        new: true,
      }
    );
  }

  @Authorized('ADMIN')
  @Mutation((returns) => User)
  async createUser(@Arg("user") user: UserInput) {
    const newUser = new UserModel({
      ...User,
    });
    newUser.save();
    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("displayName") displayName: string,
    @Ctx() ctx: Context
  ) {
    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await hash(password);

    const createResult = await UserModel.create({
      email: lowerCaseEmail,
      displayName,
      password: hashedPassword,
      userRole: UserRole.USER,
      status: UserStatus.ACTIVE,
    }).catch((error) => {
      console.error(error);
      throw new ApolloError("Failed to register your account");
    });
    const newOrganization = await OrganizationModel.create({
      name: displayName,
      owner: createResult._id,
      urlSlug: displayName.replace(/\s+/g, '-').toLowerCase(),
      isPersonal: true
    });
    
    if (!createResult || !createResult.id) {
      throw new ApolloError("Unable to register your account at this time");
    }

    ctx.req.session.email = createResult.email;
    ctx.req.session.userRole = createResult.userRole;
    ctx.req.session.userId = createResult._id.toString();

    return createResult;
  }

  @Mutation(() => LoginOutputType)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ) {
    const lowerCaseEmail = email.toLowerCase();
    const user = await UserModel.findOne({ email: lowerCaseEmail });
    if (!user) {
      throw new ApolloError("Login error");
    }
    const valid = await verify(user.password, password);
    if (!valid) {
      throw new ApolloError("Login error");
    }
    ctx.req.session.email = user.email;
    ctx.req.session.userRole = user.userRole;
    ctx.req.session.userId = user._id.toString();

    return { sessionId: ctx.req.session.id };
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() ctx: Context
  ) {
    const user = await UserModel.findOne({ email: ctx.req.session.email });
    if (!user) {
      throw new ApolloError("Login error");
    }
    const valid = await verify(user.password, oldPassword);
    if (valid) {
      const hashedPassword = await hash(newPassword);
      user.password = hashedPassword;
      user.save();
      return true;
    }
    return false;
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

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    throw new Error("Not Implemented");
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string) {
    throw new Error("Not Implemented");
  }

  @FieldResolver(type => [Organization])
  async organizations(@Root() user: User, @Ctx() ctx: Context) {
    const orgs = await OrganizationModel.find({
      $or: [
        {members: ctx.req.session.userId}, 
        {owner: ctx.req.session.userId},
        {team: {
          members: ctx.req.session.userId
        }}]
    })
    console.log(orgs)
    return orgs
  }
}
