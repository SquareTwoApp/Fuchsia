import { ObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";
import { ObjectIdScalar } from "../utils/object-id.scalar";

@InputType()
export class ProjectInput {
  @Field()
  projectName!: string;

  @Field()
  projectDescription!: string;

  @Field((type) => ObjectIdScalar)
  organizationId!: ObjectId;
}

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  projectName?: string;
}
