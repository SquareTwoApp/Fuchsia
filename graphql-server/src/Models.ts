import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./Users/User.entity";
import { Organization } from "./Organizations/Organization.entity";
import { Project } from "./Projects/Project.entity";
import { Invitation } from "./Invitations/Invitation.entity";

export const OrganizationModel = getModelForClass(Organization);
export const InvitationModel = getModelForClass(Invitation);
export const UserModel = getModelForClass(User);
export const ProjectModel = getModelForClass(Project);