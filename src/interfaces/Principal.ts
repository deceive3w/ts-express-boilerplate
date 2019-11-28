import { Permission, } from "accesscontrol";
import { Role } from "../models";
import { interfaces } from 'inversify-express-utils'
import { RoleFilter } from "./RoleFilter";
export default interface Principal {
    details: any;
    isAuthenticated(): Promise<boolean>;
    isInPermissions(role: RoleFilter): Promise<boolean>
}