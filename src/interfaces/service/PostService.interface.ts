import Post from "../../models/Post";

export interface PostService{
    createPost(post: Post): Promise<Post>
}