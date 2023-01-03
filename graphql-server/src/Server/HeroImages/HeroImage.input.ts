import { ObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";
import { ObjectIdScalar } from "../../utils/object-id.scalar";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class CreateHeroImageInput {
  @Field(type => GraphQLUpload)
  file!: FileUpload;
}
