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

  @Field((type) => Team)
  @Property({ ref: () => Team, default: [] })
  teams!: Ref<Team>[];

  @Field((type) => User)
  @Property({ ref: () => User, default: [] })
  users!: Ref<User>[];

  @Field((type) => AppConfig)
  @Property({ type: () => AppConfig, required: true })
  appConfig!: AppConfig;

  @Field((type) => ServerConfig)
  @Property({ type: () => ServerConfig, required: true })
  serverConfig!: ServerConfig;

  @Field((type) => Organization)
  @Property({ required: true })
  organization!: Ref<Team>[];
}
