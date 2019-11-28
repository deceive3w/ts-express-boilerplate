import { interfaces, BaseMiddleware} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import AuthService from "./AuthService";
import Principal from "./Principal";
import { TYPES } from "../types";
import { RoleService, UserService, PrivilegeService } from "../interfaces";
// import { Principal } from '../interfaces'

const authService = inject(TYPES.AuthService)
const userService = inject(TYPES.UserService)
const roleService = inject(TYPES.RoleService)
const privilegeService = inject(TYPES.PrivilegeService)
@injectable()
export default class AuthProvider{
    @authService private readonly _authService: AuthService
    @userService private readonly _userService: UserService
    @roleService private readonly _roleService: RoleService
    @privilegeService private readonly _privilegeService: PrivilegeService
    async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Principal>{
        let token = req.headers['authorization']
        if(token){
            token = token.split(" ")[1]
        }
        const payload = await this._authService.getPayload(token)
        const principal = new Principal(payload, this._roleService, this._userService, this._privilegeService)
        return principal
    }
}