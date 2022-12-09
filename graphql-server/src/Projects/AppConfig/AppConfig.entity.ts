import { ObjectType, Field } from "type-graphql";
import mongoose, { ObjectId } from "mongoose";
import { modelOptions, prop as Property, Severity } from "@typegoose/typegoose";
import { ObjectIdScalar } from "../../utils/object-id.scalar";
import { Matches } from "class-validator";

@ObjectType()
export class AppVariable {
  @Field((type) => ObjectIdScalar)
  readonly _id!: ObjectId;

  @Field()
  @Property()
  @Matches("^[a-zA-Z_$][a-zA-Z_$0-9]*$")
  name!: string;

  @Field()
  @Property()
  type!: string;
}

@ObjectType()
export class AppConfig {
  @Field(type => ObjectIdScalar)
  readonly _id!: ObjectId;
  
  @Field()
  @Property()
  name!: string;
  
  @Field()
  @Property({ nullable: true })
  description?: string;

  @Property()
  liveJwtSecret?: string;

  @Property()
  sandboxJwtSecret?: string;

  @Field((type) => ObjectIdScalar, { nullable: true })
  @Property()
  appEntryComponentId?: ObjectId;

  @Field((type) => [AppVariable])
  @Property({ type: () => AppVariable, default: [] })
  variables!: AppVariable[];
}
