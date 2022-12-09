import mongoose, { ObjectId } from "mongoose"
import { Service } from "typedi"
import { OrganizationModel } from "../Models"

@Service()
export class OrganizationService {
  public getOrganization(organizationId: ObjectId, userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId)
    return OrganizationModel.findOne({
      $and: [
        { _id: organizationId },
        { $or: [{members: userObjectId}, {owner: userObjectId}] }
      ]
    })
  }
}