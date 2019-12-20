import { interfaces, BaseMiddleware} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import Principal from "./Principal";
import { TYPES } from "../types";
import AuthService from "../interfaces/security/AuthService.interface";
// import { Principal } from '../interfaces'

const authService = inject(TYPES.AuthService)
const userService = inject(TYPES.UserService)
const roleService = inject(TYPES.RoleService)
const privilegeService = inject(TYPES.PrivilegeService)
@injectable()
export default class AuthProvider{
    @authService private readonly _authService: AuthService
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
        const principal = new Principal(payload)
        return principal
    }
}