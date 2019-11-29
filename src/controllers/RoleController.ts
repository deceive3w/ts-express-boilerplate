import { controller, httpPost, HttpResponseMessage, JsonContent, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserService } from '../interfaces'
import Controller from './Controller';
import { TYPES, ACTION } from '../types';
import { body, validationResult } from "express-validator";
import { User } from "../models";
import { ContextHandlerImpl } from "express-validator/src/chain";
import { RoleService } from "../interfaces";
import { authenticated } from "../security/decorator";

@controller("/role")
export default class RoleController extends Controller{
    @inject('RoleService') roleService: RoleService

    assignToRole(){

    }

    @httpGet("/")
    @authenticated({hasRole: 'superadmin'})
    async findAll(){
        const roles = await this.roleService.find()
        return this.json(roles)
    }
}