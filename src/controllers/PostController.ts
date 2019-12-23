import { controller, httpPost, HttpResponseMessage, JsonContent, httpGet, } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import Controller from './Controller';
import { TYPES, ACTION } from '../types';
import { body, validationResult } from "express-validator";
import { validator, authenticated } from "../security/decorator";
import { PostService } from "../interfaces/service/PostService.interface";
import Post from "../models/Post";

@controller("")
export default class PostController extends Controller{
    @inject('PostService') postService: PostService

    @httpPost("/post")
    @validator([
        body('text').exists().withMessage("Post cannot be empty.")
    ])
    @authenticated()
    async createPost(){
        try{
            let post = new Post()
            post.text = this.httpContext.request.body.text
            post.userId = this.httpContext.response.locals.user.id
            let data = await this.postService.createPost(post)
            return this.json(data)
        }catch(e){
            return this.json({error: e.message})
        }
    }
}