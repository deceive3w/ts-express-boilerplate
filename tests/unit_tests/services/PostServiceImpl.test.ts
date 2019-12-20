import PostServiceImpl from "../../../src/services/PostServiceImpl"
import Post from "../../../src/models/Post"
import { Container } from "inversify"
import { container } from "../../../src/bootstraps/inversify.config"
import { PostRepository } from "../../../src/repositories"
import { getCustomRepository } from "typeorm"
import { PostService } from "../../../src/interfaces/service/PostService.interface"
import DBConnection from "../../../src/utils/mysql/db-connection"

describe('Testing Post Service', ()=>{
    let container: Container
    beforeAll(async()=>{
        container = new Container()
        container.bind<PostRepository>("PostRepository").toDynamicValue(()=>{
            let mockRepository = new PostRepository()
            mockRepository.save = (post)=>{
                return post
            }
            return mockRepository
        })
        container.bind<PostService>("PostService").to(PostServiceImpl)
    })

    test('it should can create post',async ()=>{
        const service = container.get<PostService>("PostService")
        const post = new Post()
        post.text = "test"
        const result = await  service.createPost(post)
        console.log(result)
    })
})