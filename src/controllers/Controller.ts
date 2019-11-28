import { BaseHttpController, HttpResponseMessage, JsonContent } from "inversify-express-utils";
import { check, validationResult, ValidationChain,} from 'express-validator'
import { response } from "express";
export default class Controller extends BaseHttpController{
    unauthorized(){
        this.httpContext.response.status(401).send()
    }

    json(content: any, statusCode?:number):any{
        let response = new HttpResponseMessage(statusCode);
        response.content = new JsonContent(content);
        return response
    }
}