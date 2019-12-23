import { Container } from "inversify";
import { PostRepository } from "../repositories";
import { getConnection, getCustomRepository } from "typeorm";
import { PostService } from "../interfaces/service/PostService.interface";
import PostServiceImpl from "../services/PostServiceImpl";
import { PollRepository } from "../repositories/PollRepository";
import AuthService from "../interfaces/security/AuthService.interface";
import AuthServiceImpl from "../security/AuthService";
import AuthProvider from "../interfaces/security/AuthProvider.interface";
import AuthProviderImpl from "../security/AuthProvider";

let container = new Container();
container.bind<PostRepository>("PostRepository").toDynamicValue(()=>{
    return getCustomRepository(PostRepository)
})
container.bind<PollRepository>("PollRepository").toDynamicValue(()=>{
    return getCustomRepository(PollRepository)
})
container.bind<PostService>("PostService").to(PostServiceImpl)
container.bind<AuthService>("AuthService").to(AuthServiceImpl)
container.bind<AuthProvider>("AuthProvider").to(AuthProviderImpl)
export { container }