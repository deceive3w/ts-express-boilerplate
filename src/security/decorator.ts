import { Handler, Request, Response, NextFunction, text } from "express";
import AuthProvider from "./AuthProvider";
import { Container } from "inversify";
import { ValidationChain, validationResult } from "express-validator";

export function authenticated (): any {
    return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) {
        const fn = descriptor.value as Handler;
        descriptor.value = async function (_request: Request, _response: Response, _next: NextFunction) {
            try{
                let container = this.httpContext.container as Container
                const authProvider = await container.get<AuthProvider>("AuthProvider").getUser(_request, _response, _next)
        
                const _isAuthenticated = (await authProvider.isAuthenticated());
                if (_isAuthenticated) {

                    // if(role){
                    //     try{
                    //         const isInPermission = await authProvider.isInPermissions(role)
                    //         if(!isInPermission){
                    //             _response
                    //                 .status(403)
                    //                 .send({ error: "The user is not have permission." });
                    //             return _response
                    //         }
                    //     }catch(e){
                    //         _response
                    //             .status(403)
                    //             .send({ error: "The user is not have permission." });
                    //         return _response
                    //     }
                    // }
                    
                    _response.locals.isAuthenticated = _isAuthenticated
                    _response.locals.user = authProvider.user()
                
                    return fn.call(this, _request, _response)
                } else {
                    _response
                        .status(401)
                        .send({ error: "Invalid Token." });
                    return _response;
                }
            }catch(e){
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
    return `${param}: ${msg}`;
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