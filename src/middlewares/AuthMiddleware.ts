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
        let token = req.headers["authorization"]
        try{
            if(token){
                token = token.split(" ")[1]
            }
            jwtPayload = jwt.verify(token, JWT_SECRET)
        }catch(error){
            res.status(401).send()
            return
        }
        next()
    }
}