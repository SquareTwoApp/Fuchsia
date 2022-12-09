import { ObjectId } from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../utils/ref-type";
import { User } from "../Users/User.entity";
import { Project } from "../Projects/Project.entity";
import { ObjectIdScalar } from "../utils/object-id.scalar";
import { Team } from "../Teams/Team.entity";
import { Invitation } from "../Invitations/Invitation.entity";
import { NotContains } from "class-validator";

@ObjectType()
export class Organization {
    @Field(type => ObjectIdScalar)
    readonly _id!: ObjectId;

    @Field()
    @Property({ required: true, unique: true })
    name!: string;
    
    @Field()
    @Property({ required: true, unique: true })
    urlSlug!: string;

    @Field()
    @Property({ required: true })
    isPersonal!: boolean;

    @Field({ nullable: true })
    @Property()
    avatar?: string;

    @Field(type => User)
    @Property({ ref: 'User', required: true })
    owner!: Ref<User>;

    @Field(type => [User])
    @Property({ ref: () => User, default: [] })
    members!: Ref<User>[];

    @Field(type => [Team])
    @Property({ ref: () => Team, default: [] })
    teams!: Ref<Team>[];

    @Field(type => Invitation)
    @Property({ ref: () => Invitation, default: [] })
    invitees!: Ref<Invitation>[];
}
