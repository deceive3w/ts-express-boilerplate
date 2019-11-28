import { inject, injectable } from "inversify";
import { Role, Privilege } from "../models";
import { RoleService, PrivilegeService } from '../interfaces'
import { RoleRepository, PrivilegeRepository } from '../repositories'
import { ACTION } from "../types";

@injectable()
export default class RoleServiceImpl implements RoleService {
    @inject('RoleRepository') roleRepository: RoleRepository
    @inject('PrivilegeRepository') privilegeRepository: PrivilegeRepository
    async createRole(role: Role): Promise<Role> {
        let privilegeIds = []
        if(role.privileges){
            for(let i = 0; i < role.privileges.length; i++){
                let createPrivilege = await this.privilegeRepository.create((role.privileges[i] as Privilege))
                privilegeIds.push(createPrivilege._id)
            }
        }
        role.privileges = privilegeIds
        let data = await this.roleRepository.create(role)
        return data
    }    
    async updateRole(_id: string, data: Role): Promise<Role> {
        await this.roleRepository.update({_id}, data)
        let role = await this.roleRepository.findById(_id)
        return role
    }
    find(param?: Role): Promise<Role[]> {
        return new Promise((resolve ,reject)=>{
            this.roleRepository.find(param).populate('users').populate('privileges').then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    async findById(_id: string): Promise<Role>{
        let role = await this.roleRepository.findById(_id)
        return role
    }
}