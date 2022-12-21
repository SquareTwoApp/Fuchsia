import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./Users/User.entity";
import { Organization } from "./Organizations/Organization.entity";
import { Project } from "./Projects/Project.entity";
import { Invitation } from "./Invitations/Invitation.entity";
import { ServerConfig } from "./Projects/ServerConfig/ServerConfig.entity";
import { AppConfig } from "./Projects/AppConfig/AppConfig.entity";
import { HeroImage } from "./Server/HeroImages/HeroImage.entity";

export const OrganizationModel = getModelForClass(Organization);
export const InvitationModel = getModelForClass(Invitation);
export const UserModel = getModelForClass(User);
export const ProjectModel = getModelForClass(Project);
export const ServerConfigModel = getModelForClass(ServerConfig);
export const AppConfigModel = getModelForClass(AppConfig);
export const HeroImageModel = getModelForClass(HeroImage);