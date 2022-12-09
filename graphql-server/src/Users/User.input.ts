import { Field, InputType } from "type-graphql";
import { ObjectIdScalar } from "../utils/object-id.scalar";
import { User } from "./User.entity";
import { ObjectId } from "mongoose";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email!: string;
  
  @Field({ nullable: true })
  fullName!: string;

  @Field((type) => [ObjectIdScalar], { nullable: true })
  favorites!: ObjectId[];

  @Field((type) => [ObjectIdScalar], { nullable: true })
  hidden!: ObjectId[];
}
