import { controller, httpPost, HttpResponseMessage, JsonContent, httpGet, } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserService } from '../interfaces'
import Controller from './Controller';
import { TYPES, ACTION } from '../types';
import { body, validationResult } from "express-validator";
import { User } from "../models";
import { authenticated, validator } from "../security/decorator";

@controller("")
export default class UserController extends Controller{
    @inject('UserService') userService: UserService

    @httpPost("/login")
    @validator([
        body('email').isEmail().exists(),
        body('password').exists()
    ])
    async login(){
        try{
            let data = await this.userService.login(this.httpContext.request.body.email, this.httpContext.request.body.password)
            return this.json(data)
        }catch(e){
            return this.json({error: e.message})
        }
    }

    @httpPost("/register")
    @validator([
        body("email").isEmail().withMessage("Email is not valid."),
        body("password").isLength({min: 5}).withMessage("Password is must be at least 5 chars long"),
        body("firstName").exists().withMessage("First Name is required.")
    ])
    async register(){
        try{
            let user: User = {
                email: this.httpContext.request.body.email,
                password: this.httpContext.request.body.password,
                firstName: this.httpContext.request.body.firstName,
                lastName: this.httpContext.request.body.lastName,
            }
            let register = await this.userService.register(user)
            return this.json(register)
        }catch(e){
            return this.json({
                error: e.message
            })
        }
    }

    @httpGet("/user/profile")
    async profile(){
        try{
            let user = await this.userService.findById(this.httpContext.user.details.userId)
            return this.json(user)
        }catch(e){
            return this.json({
                error: e.message
            })
        }
    }
}