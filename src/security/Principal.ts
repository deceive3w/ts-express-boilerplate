import { inject, injectable } from "inversify";
import { RoleService, UserService, Principal as IPrincipal, PrivilegeService} from "../interfaces";
import { AccessControl, Permission } from "accesscontrol";
import { ACTION } from "../types"
import { Role, Privilege } from "../models";
import { principal } from "inversify-express-utils";
import { RoleFilter } from "../interfaces/RoleFilter";
const roleService = inject('RoleService')
const accessControl = inject('AccessControl')


export default class Principal implements IPrincipal{
    private _roleService: RoleService
    private _userService: UserService
    private _previlegeService: PrivilegeService
    details: any;
    constructor(details, roleService: RoleService, userService: UserService, previlegeService: PrivilegeService){
        this.details = details
        this._roleService =roleService
        this._userService = userService
        this._previlegeService = previlegeService
    }

    isAuthenticated(): Promise<boolean> {
        if(this.details.error || !this.details.userId){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }

    async isInPermissions(role: RoleFilter): Promise<boolean>{
        let user = await this._userService.findById(this.details.userId)
        let roles = await this._roleService.find({name: role.hasRole})
        if(roles.length > 0){
            if(user.roles.includes(roles[0]._id)){
                if(!role.hasAuthority){
                    return Promise.resolve(true)
                }else{
                    let matchesPrivilege = (roles[0].privileges as Privilege[]).filter((p)=>p.privilege == role.hasAuthority)
                    if(matchesPrivilege.length > 0){
                        return  Promise.resolve(true)
                    }
                }
            }
        }
        return Promise.resolve(false)
    }

}