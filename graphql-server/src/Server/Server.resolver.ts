import {
  Query,
} from "type-graphql";
import { Service } from "typedi";
import { SERVER_VERSION } from "../utils/config";

@Service()
export class ServerResolver {
  @Query(returns => String, { nullable: true })
  async serverVersionNumber() {
      return SERVER_VERSION
  }
}
