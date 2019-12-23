import SqliteMemoryConnection from "../../../src/utils/mysql/memory-connection"
import server from "../../../src/utils/express/server"
import { Container, injectable } from "inversify"
import { container } from "../../../src/bootstraps/inversify.config"
import request from 'supertest'
import '../../../src/controllers'
import AuthProvider from '../../../src/interfaces/security/AuthProvider.interface';
import Principal from "../../../src/interfaces/security/Principal.interface";
import AuthProviderImpl from "../../../src/security/AuthProvider";
import { getCustomRepository } from 'typeorm';
import { PostRepository } from "../../../src/repositories";
import { PollRepository } from '../../../src/repositories/PollRepository';
import { PostService } from "../../../src/interfaces/service/PostService.interface";
import AuthService from '../../../src/interfaces/security/AuthService.interface';
import PostServiceImpl from '../../../src/services/PostServiceImpl';
import AuthServiceImpl from '../../../src/security/AuthService';


class MockPrincipal implements Principal{
    user() {
        return {
            id: 12312312
        }
    }
    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(true)
    }
}

@injectable()
class MockAuthProvider implements AuthProvider{
    getUser(req, res, next){
        return Promise.resolve(new MockPrincipal())
    }
}
describe('Testing Post Controller', ()=>{
    let app: Express.Application
    let token: string
    beforeAll(async ()=>{
        await SqliteMemoryConnection.openConnection()
        app = server(container).build()
    })
    
    it('should cant create post without token',async()=>{
        await request(app)
        .post('/post')
        .send({
            text:"test post",
        }).then((res)=>{
            expect(res.body.error).toBe("Invalid Token.")
        })
    })

    it('should can create post with token',async()=>{
        await request(app)
        .post('/post')
        .set('authorization', 'cFpGMnpnbGRXYktTOG1mUVpYUmpTaDhuQ3NrR3JpWE9BUDc0S2Z5NVhsMHFEZGJ1YlJ4Vk1JejJWazk3UzZJYw==')
        .send({
            text:"test post",
        }).then((res)=>{
            expect(res.body.text).toBe('test post')
            expect(res.body.createdAt).not.toBe(null)
        })
    })

    it('should can create post mock server auth',async()=>{
        let container = new Container()
        container.bind<PostRepository>("PostRepository").toDynamicValue(()=>{
            return getCustomRepository(PostRepository)
        })
        container.bind<PollRepository>("PollRepository").toDynamicValue(()=>{
            return getCustomRepository(PollRepository)
        })
        container.bind<PostService>("PostService").to(PostServiceImpl)
        container.bind<AuthService>("AuthService").to(AuthServiceImpl)
        container.bind<AuthProvider>("AuthProvider").to(MockAuthProvider)
        let mockServer = server(container).build()
        await request(mockServer)
        .post('/post')
        .send({
            text:"test post",
        }).then((res)=>{
            expect(res.body.text).toBe('test post')
            expect(res.body.createdAt).not.toBe(null)
        })
    })

    it('should can validate input create post', async ()=>{
        await request(app)
        .post('/post')
        .send().then((res)=>{
            expect(res.body).toHaveProperty("errors")
        })
    })
})