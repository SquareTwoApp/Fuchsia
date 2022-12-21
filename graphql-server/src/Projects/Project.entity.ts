import { ObjectType, Field } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { Organization } from "../Organizations/Organization.entity";
import { Ref } from "../utils/ref-type";
import { AppConfig } from "./AppConfig/AppConfig.entity";
import { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../utils/object-id.scalar";
import { v4 as uuid } from "uuid";
import { ServerConfig } from "./ServerConfig/ServerConfig.entity";
import { Team } from "../Teams/Team.entity";
import { User } from "../Users/User.entity";
import { HeroImage } from "../Server/HeroImages/HeroImage.entity";

@ObjectType()
export class Project {
  @Field((type) => ObjectIdScalar)
  readonly _id!: ObjectId;

  @Field((type) => String)
  @Property({ required: true, default: uuid() })
  readonly appId!: string;

  @Field()
  @Property({ required: true })
  projectName!: string;

  @Field((type) => HeroImage, { nullable: true })
  @Property({ ref: () => HeroImage, default: null, nullable: true })
  heroImage!: Ref<HeroImage>;

  @Field((type) => [Team])
  @Property({ ref: () => Team, default: [] })
  teams!: Ref<Team>[];

  @Field((type) => [User])
  @Property({ ref: () => User, default: [] })
  users!: Ref<User>[];

  @Field((type) => [AppConfig])
  @Property({ ref: () => AppConfig, default: [] })
  appConfig!: Ref<AppConfig>[];

  @Field((type) => [ServerConfig])
  @Property({ ref: () => ServerConfig, default: [] })
  serverConfig!: Ref<ServerConfig>[];

  @Field((type) => Organization)
  @Property({ ref: () => Organization, required: true })
  organization!: Ref<Organization>;
}
