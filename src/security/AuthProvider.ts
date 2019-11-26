import { interfaces, BaseMiddleware } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import AuthService from "./AuthService";
import Principal from './Principal'

const authService = inject('AuthService')
@injectable()
export default class AuthProvider implements interfaces.AuthProvider{
    @authService private readonly _authService: AuthService
    async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<interfaces.Principal>{
        let token = req.headers['authorization']
        if(token){
            token = token.split(" ")[1]
        }
        const payload = await this._authService.getPayload(token)
        const principal = new Principal(payload)
        return principal
    }
}