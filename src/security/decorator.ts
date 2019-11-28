import { Role } from "../models";
import { Handler, Request, Response, NextFunction } from "express";
import AuthProvider from "./AuthProvider";
import { Container } from "inversify";
import { ValidationChain, validationResult } from "express-validator";
import { RoleFilter } from "../interfaces/RoleFilter";


export function authenticated (role: RoleFilter): any {
    return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
        const fn = descriptor.value as Handler;
        descriptor.value = async function (_request: Request, _response: Response, _next: NextFunction) {
            let container = this.httpContext.container as Container
            const authProvider = await container.get<AuthProvider>("AuthProvider").getUser(_request, _response, _next)
            const _isAuthenticated = (await authProvider.isAuthenticated());
            if (_isAuthenticated) {
                if(role){
                    try{
                        const isInPermission = await authProvider.isInPermissions(role)
                        console.log("is in permission", isInPermission)
                        if(!isInPermission){
                            _response
                                .status(403)
                                .send({ error: "The user is not have permission." });
                            return _response
                        }
                    }catch(e){
                        console.log("ee", e)
                        _response
                            .status(403)
                            .send({ error: "The user is not have permission." });
                        return _response
                    }
                }
                return fn.call(this, _request, _response)
            } else {
                _response
                    .status(401)
                    .send({ error: "Invalid Token." });
                return _response;
            }

        };

        return descriptor;
    };
}


const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `message: ${msg}`;
};
export function validator (fields: ValidationChain[]): any {
    return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
        const fn = descriptor.value as Handler;
        descriptor.value = async function (_request: Request, _response: Response, _next: NextFunction) {
            await Promise.all(fields.map(validation => validation.run(_request)));
            const errors = validationResult(_request).formatWith(errorFormatter);
            if (errors.isEmpty()) {
                return fn.call(this, _request, _response)
            }else{
                _response
                    .status(400)
                    .send({ errors: errors.array() });
                return _response
            }
        };

        return descriptor;
    };
}