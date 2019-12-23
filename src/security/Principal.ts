import { inject, injectable } from "inversify";
import Principal from "../interfaces/security/Principal.interface";
const roleService = inject('RoleService')
const accessControl = inject('AccessControl')


export default class PrincipalImpl implements Principal{
    user() {
        return this.details
    }
    details: any;
    constructor(details){
        this.details = details
    }

    isAuthenticated(): Promise<boolean> {
        if(this.details.error || !this.details.id){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
}