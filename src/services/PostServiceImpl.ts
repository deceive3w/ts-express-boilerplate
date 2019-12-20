import { PostService } from "../interfaces/service/PostService.interface";
import Post from "../models/Post";
import { inject, injectable } from "inversify";
import { PostRepository } from "../repositories";

@injectable()
export default class PostServiceImpl implements PostService {
    @inject("PostRepository") postRepository: PostRepository
    createPost(post: Post): Promise<Post> {
        return this.postRepository.save(post)
    }
}