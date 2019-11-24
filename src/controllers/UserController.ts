import { controller, httpPost, HttpResponseMessage, JsonContent, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserService } from '../services'
import Controller from './Controller';
import { IUserService } from '../types';
import { body } from "express-validator";
import { validator } from "../utils/decorators/decorators";
import { User } from "../models";
import { ContextHandlerImpl } from "express-validator/src/chain";

@controller("")
export default class UserController extends Controller{
    @inject('UserService') userService: IUserService

    @httpPost("/login", ...[body('email').isEmail().exists(), body('password').exists()])
    async login(){
        const response = new HttpResponseMessage(200)
        let data = await this.userService.login(this.httpContext.request.body.email, this.httpContext.request.body.password)
        return data
    }

    @httpPost("/register")
    @validator([
        body("email").isEmail().withMessage("Email is not valid."),
        body("password").isLength({min: 5}).withMessage("Password is must be at least 5 chars long"),
        body("firstName").exists().withMessage("First Name is required.")
    ])
    async register(){
        
        const response = new HttpResponseMessage(200)
        try{
            let user: User = {
                email: this.httpContext.request.body.email,
                password: this.httpContext.request.body.password,
                firstName: this.httpContext.request.body.firstName,
                lastName: this.httpContext.request.body.lastName,
            }
            response.content = new JsonContent({
                message: "success"
            })
            return response
        }catch(e){
            console.log("e", e)
            return {
                error: e.message
            }
        }
    }
}