import { inject, injectable } from "inversify";
const roleService = inject('RoleService')
const accessControl = inject('AccessControl')


export default class Principal{
    details: any;
    constructor(details){
        this.details = details
    }

    isAuthenticated(): Promise<boolean> {
        if(this.details.error || !this.details.userId){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
}