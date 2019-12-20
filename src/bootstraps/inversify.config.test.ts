import { container } from "./inversify.config"
import DBConnection from "../utils/mysql/db-connection"
import { PostService } from "../interfaces/service/PostService.interface"
import { PostRepository } from "../repositories"
import { getConnection, getRepository, getCustomRepository } from "typeorm"

describe('Testing Dependency Container', ()=>{
    beforeAll(async ()=>{
        await DBConnection.openConnection()
    })
    it('should can instance repository', ()=>{
        expect(container.get<PostRepository>('PostRepository')).not.toBe(null)
    })
    afterAll(()=>{
        getConnection().close()
    })
})