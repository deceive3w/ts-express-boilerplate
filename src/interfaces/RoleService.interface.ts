import { Role } from "../models";


export default interface RoleService {
    createRole(role: Role): Promise<Role>
    updatePermissions(_id: string, data: Role): Promise<Role>
    find(param?: Role): Promise<Role[]>
    findById(_id: string): Promise<Role>
}