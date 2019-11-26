import { inject, injectable } from "inversify";
import { Role } from "../models";
import RoleService from "../interfaces/RoleService.interface";
import RoleRepository from "../repositories/RoleRepository";

@injectable()
export default class RoleServiceImpl implements RoleService {
    @inject('RoleRepository') roleRepository: RoleRepository
    async createRole(role: Role): Promise<Role> {
        let data = await this.roleRepository.create(role)
        return data
    }    
    async updatePermissions(_id: string, data: Role): Promise<Role> {
        await this.roleRepository.update({_id}, data)
        let role = await this.roleRepository.findById(_id)
        return role
    }
    find(param?: Role): Promise<Role[]> {
        return this.roleRepository.find(param)
    }
    findById(_id: string): Promise<Role>{
        return this.roleRepository.findById(_id)
    }
}