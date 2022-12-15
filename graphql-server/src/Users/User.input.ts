import { Field, InputType } from "type-graphql";
import { ObjectIdScalar } from "../utils/object-id.scalar";
import { User } from "./User.entity";
import { ObjectId } from "mongoose";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  removeAvatar?: boolean;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  uploadFile?: FileUpload;

  @Field((type) => [ObjectIdScalar], { nullable: true })
  favorites?: ObjectId[];

  @Field((type) => [ObjectIdScalar], { nullable: true })
  hidden?: ObjectId[];
}
