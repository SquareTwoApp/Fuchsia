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
        { $or: [{ members: userObjectId }, { owner: userObjectId }] }
      ]
    })
    return !!org
  }

  public async getProjects(userId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId)
    const org = await OrganizationModel.find({
      $or: [{ members: userObjectId }, { owner: userObjectId }]
    })
    console.log("GET PROJECTSSS");

    console.log(org);

    const projects = await ProjectModel.find({
      organization: org.map(o => o._id)
    }).populate(["heroImage"])
    console.log(projects)
    return projects
  }
}