import { interfaces, BaseMiddleware} from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../types";
import AuthService from "../interfaces/security/AuthService.interface";
// import { Principal } from '../interfaces'
import AuthProvider from '../interfaces/security/AuthProvider.interface';
import Principal from '../interfaces/security/Principal.interface';
import PrincipalImpl from './Principal';
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "constants";

const authService = inject(TYPES.AuthService)
const userService = inject(TYPES.UserService)
const roleService = inject(TYPES.RoleService)
const privilegeService = inject(TYPES.PrivilegeService)
@injectable()
export default class AuthProviderImpl implements AuthProvider{
    @authService private readonly _authService: AuthService
    async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Principal>{
        let token = req.headers['authorization']
        if(token){
            token = token.split(" ")[token.split(" ").length-1]
        }

        let payload = await this._authService.getPayload(token)
        const principal = new PrincipalImpl(payload)
        return principal
    }
}