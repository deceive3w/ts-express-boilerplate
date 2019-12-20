import SqliteMemoryConnection from "../../../src/utils/mysql/memory-connection"
import server from "../../../src/utils/express/server"
import { Container } from "inversify"
import { container } from "../../../src/bootstraps/inversify.config"
import request from 'supertest'
import '../../../src/controllers'
import AuthProvider from "../../../src/security/AuthProvider"

describe('Testing Post Controller', ()=>{
    let app: Express.Application
    let token: string
    beforeAll(async ()=>{
        await SqliteMemoryConnection.openConnection()
        app = server(container, AuthProvider).build()
    })

    it('should can create post',async()=>{
        await request(app)
        .post('/post')
        .send({
            text:"test post",
        }).then((res)=>{
            console.log(res.body)
           expect(res.body.text).toBe('test post')
           expect(res.body.id).toBe(1)
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