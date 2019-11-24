import UserController from './UserController';
import { IUserService, LoginSuccess } from '../types';
import { User,  UserModel} from '../models/';
import { Container } from 'inversify';
import request from 'supertest'
import server from '../utils/express/server'
import express from 'express'
import { cleanUpMetadata } from 'inversify-express-utils';
import UserRepository from '../repositories/UserRepository';
import { UserService, AuthService } from '../services';
import MongoMemoryConnection from '../utils/mongodb/memory-connection'
describe("User Controller Test", ()=>{
    let container: Container = new Container()
    let app: express.Application
    beforeAll(async ()=>{
        await MongoMemoryConnection.getConnection(()=>{
            container.bind<IUserService>('UserService').to(UserService)
            container.bind<UserController>('UserController').to(UserController)
            container.bind<UserRepository>('UserRepository').to(UserRepository)
            container.bind<AuthService>('AuthService').to(AuthService)
            container.bind('UserModel').to(UserModel)
            app = server(container).build()
        })
    })

    test('it should validate register error', async ()=>{
        await request(app)
            .post('/register')
            .send({
                email:"admin.com",
                firstName:'admin',
            }).then((res)=>{
                expect(res.body).toHaveProperty("errors")
            })
    })

    test('it should validate register valid', async ()=>{
        await request(app)
            .post('/register')
            .send({
                email:"admin@admin.com",
                firstName:'admin',
                password:"adminadmin"
            }).then((res)=>{
                expect(res.body).toHaveProperty("message")
            })
    })

    // test('it should can login', async ()=>{
    //     await request(app).post("/login").then((res)=>{
    //         console.log(res.body)
    //     })
    // })
})