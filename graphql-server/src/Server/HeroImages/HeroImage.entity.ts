import { ObjectId } from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../../utils/ref-type";
import { User } from "../../Users/User.entity";
import { ObjectIdScalar } from "../../utils/object-id.scalar";

@ObjectType()
export class HeroImage {
    @Field(type => ObjectIdScalar)
    readonly _id!: ObjectId;

    @Field(type => User, { nullable: true })
    @Property({ ref: 'User', nullable: true, default: null })
    owner?: Ref<User>;

    @Field(type => String)
    @Property()
    path!: string;

    @Field(() => Date)
    @Property(() => Date)
    createdAt!: Date;
    
    @Field(() => Date)
    @Property(() => Date)
    modifiedAt!: Date;
}
