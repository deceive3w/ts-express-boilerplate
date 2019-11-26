import { inject, injectable } from "inversify";
import { Role } from "../models";
import { LoginSuccess } from "../types";
import AuthService from '../security/AuthService';
import { UserService,Repository } from "../interfaces";
import RoleService from "../interfaces/RoleService.interface";
import RoleRepository from "../repositories/RoleRepository";

@injectable()
export default class RoleServiceImpl implements RoleService {
    @inject('RoleRepository') roleRepository: RoleRepository
    createRole(role: Role): Promise<Role> {
        return this.roleRepository.create(role)
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