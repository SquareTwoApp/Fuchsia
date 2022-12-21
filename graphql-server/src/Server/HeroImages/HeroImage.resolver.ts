import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import mongoose, { ObjectId } from "mongoose";
import { ObjectIdScalar } from "../../utils/object-id.scalar";
import { Service } from "typedi";
import { HeroImage } from './HeroImage.entity';
import { CreateHeroImageInput } from './HeroImage.input';
import { HeroImageModel, UserModel } from "../../Models";
import { ApolloError } from "apollo-server-core";
import { Context } from "../../types";

import { S3_BUCKET_NAME, S3_REGION, TEMP_DIR } from '../../utils/config';
import * as path from "path";
import * as fs from "fs";
import { v4 } from "uuid";
import { S3Uploader } from "../../utils/s3-uploader";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@Service()
@Resolver(HeroImage)
export class HeroImageResolver {

  @FieldResolver()
  path(@Root() heroImage: HeroImage) {
    if(heroImage.path) {
      heroImage.path = `https://${S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com/HeroImages/${heroImage.path}`;
    }
    return heroImage.path;
  }

  @Authorized()
  @Query(returns => [HeroImage], { nullable: true })
  async listHeroImages(
    @Ctx() ctx: Context
  ) {
    if (!ctx.req.session.email) {
      throw new ApolloError("Unauthorized");
    }
    const me = await UserModel.findOne({ email: ctx.req.session.email });

    return HeroImageModel.find({
      $or: [
        { user: null },
        { user: me }
      ]
    });
  }

  @Authorized()
  @Mutation(returns => HeroImage)
  async createHeroImage(
    @Ctx() ctx: Context,
    @Arg('image', type => GraphQLUpload) image: FileUpload
  ) {
    const me = await UserModel.findOne({ email: ctx.req.session.email });
    if (!me) { throw new ApolloError("Authorization error"); }
    if (!image) { throw new ApolloError("No file to upload"); }
    const { createReadStream, filename } = image;

    if (!filename) { throw new ApolloError("No file to upload"); }

    const uploadDir = TEMP_DIR;
    const tempSplitFile = filename.split('.');
    const ext = (tempSplitFile.length > 1 ? "." + tempSplitFile.pop() : "").toLowerCase().trim();

    if (![".jpg", ".jpeg", ".gif", ".png"].includes(ext)) {
      throw new ApolloError("Invalid file type");
    }

    const tempFn = 'hero_' + me._id + "_" + tempSplitFile.join('-').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + ext;
    const myPath = `${uploadDir}/${tempFn}`;
    const stream = createReadStream();
    const out = fs.createWriteStream(myPath);

    let fileContinue = true;

    const mimeType: string = image.mimetype;
    const promiseFn = await new Promise((resolve, reject) => {
      stream.pipe(out)
        .on("finish", () => resolve({ tempFn }))
        .on("error", reject)
    }).catch(error => {
      throw new ApolloError(error.message);
      fileContinue = false;
    });

    if (fileContinue) {
      const destinationFilename = v4() + ext;
      const destinationFile = "HeroImages/" + destinationFilename;
      const s3Client = new S3Uploader();
      await s3Client.uploadFile(
        myPath,
        destinationFile,
        mimeType
      ).then(resp => {
        //If the upload completes successfully, let's delete the temp file
        if(resp) {
          fs.unlink(myPath, err => {
            if(err) {
              console.log('HeroImage.resolver::createHeroImage -> fs.unlink error:' + err.message);
            }
          });
        }
      }).catch(error => {
        throw new ApolloError(error);
      });

      const result = await HeroImageModel.create({
        owner: me,
        path: destinationFilename
      });
      if (!result) {
        throw new ApolloError("File upload error");
      }
      return result;
    }
    throw new ApolloError("File upload error");
  }

  @Authorized()
  @Mutation(returns => Boolean)
  async deleteHeroImage(
    @Ctx() ctx: Context,
    @Arg('_id', type => ObjectIdScalar) _id: ObjectId
  ) {
    throw new ApolloError("Not yet implemented");
  }
}
