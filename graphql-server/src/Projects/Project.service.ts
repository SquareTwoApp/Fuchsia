import mongoose, { ObjectId } from "mongoose"
import { Service } from "typedi"
import { OrganizationModel, ProjectModel } from "../Models"

@Service()
export class ProjectService {
  public async checkAccess(projectId: ObjectId, userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const org = await OrganizationModel.findOne({
      $and: [
        { projects: projectId },
        { $or: [{members: userObjectId}, {owner: userObjectId}] }
      ]
    })
    return !!org
  }

  public async getProjects(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const org = await OrganizationModel.find({
        $or: [{members: userObjectId}, {owner: userObjectId}]
    })
    const projects = await ProjectModel.find({
      organizations: org.map(o => o._id)
    })
    console.log(projects)
    return projects
  }
}