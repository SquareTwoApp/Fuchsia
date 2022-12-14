import { ObjectId } from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../utils/ref-type";
import { User } from "../Users/User.entity";
import { ObjectIdScalar } from "../utils/object-id.scalar";

@ObjectType()
export class Team {
    @Field(type => ObjectIdScalar)
    readonly _id!: ObjectId;

    @Field()
    @Property({ required: true })
    name!: string;

    @Field(type => User)
    @Property({ ref: 'User', required: true })
    owner!: Ref<User>;

    @Field(type => [User])
    @Property({ ref: () => User, default: [] })
    members!: Ref<User>[];
}
