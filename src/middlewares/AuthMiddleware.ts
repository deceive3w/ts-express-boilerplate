import { BaseMiddleware } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import jwt from 'jsonwebtoken'
import express from 'express';
import { JWT_SECRET } from "../config";

@injectable()
export default class AuthMiddleware extends BaseMiddleware{
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ){
        let jwtPayload = {}
        const token = req.headers["authorization"]
        try{
            jwtPayload = jwt.verify(token, JWT_SECRET)
            res.locals.jwtPayload = jwtPayload
        }catch(error){
            res.status(401).send()
            return
        }

        next()
    }
}