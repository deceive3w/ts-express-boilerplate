import { inject, injectable } from "inversify";
import { Privilege } from "../models";
import { PrivilegeService } from '../interfaces'
import { PrivilegeRepository } from '../repositories'
import { ACTION } from "../types";

@injectable()
export default class PrivilegeServiceImpl implements PrivilegeService {
    @inject('PrivilegeRepository') privilegeRepository: PrivilegeRepository
    async createPrivilege(Privilege: Privilege): Promise<Privilege> {
        let data = await this.privilegeRepository.create(Privilege)
        return data
    }    
    async updatePrivilege(_id: string, data: Privilege): Promise<Privilege> {
        await this.privilegeRepository.update({_id}, data)
        let privilege = await this.privilegeRepository.findById(_id)
        return privilege
    }
    find(param?: Privilege): Promise<Privilege[]> {
        return new Promise((resolve, reject)=>{
            this.privilegeRepository.find(param).populate('roles').then((res)=>{
                resolve(res)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
    async findById(_id: string): Promise<Privilege>{
        let privilege = await this.privilegeRepository.findById(_id)
        return privilege
    }
}