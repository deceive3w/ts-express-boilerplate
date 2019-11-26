import UserController from '../src/controllers/UserController';
import { User,  UserModel} from '../src/models';
import { Container } from 'inversify';
import request from 'supertest'
import server from '../src/utils/express/server'
import express from 'express'
import UserRepository from '../src/repositories/UserRepository';

import MongoMemoryConnection from '../src/utils/mongodb/memory-connection'
import { UserService } from '../src/interfaces'
import { UserServiceImpl } from '../src/services';
import { AuthMiddleware } from '../src/middlewares'
import { TYPES } from '../src/types';
import AuthService from '../src/security/AuthService';
import AuthProvider from '../src/security/AuthProvider'
describe("User Controller Test", ()=>{
    let container: Container = new Container()
    let app: express.Application
    let token: string
    beforeAll(async ()=>{
        await MongoMemoryConnection.getConnection(()=>{
            container.bind<UserService>('UserService').to(UserServiceImpl)
            container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
            container.bind<UserController>('UserController').to(UserController)
            container.bind<UserRepository>('UserRepository').to(UserRepository)
            container.bind<AuthService>('AuthService').to(AuthService)
            container.bind('UserModel').to(UserModel)
            app = server(container, AuthProvider).build()
        })
    })

    test('it should validate register', async ()=>{
        await request(app)
            .post('/register')
            .send({
                email:"admin.com",
                firstName:'admin',
            }).then((res)=>{
                expect(res.body).toHaveProperty("errors")
            })
    })

    test('it should can register', async ()=>{
        await request(app)
            .post('/register')
            .send({
                email:"admin@admin.com",
                firstName:'admin',
                password:"adminadmin"
            }).then((res)=>{
                expect(res.body).toHaveProperty("_id")
            })
    })
    test('it should validate login', async ()=>{
        await request(app)
            .post("/login")
            .then((res)=>{
                expect(res.body).toHaveProperty("errors")
            })
    })
    test('it should can login', async ()=>{
        await request(app)
            .post("/login")
            .send({
               email: "admin@admin.com",
               password:"adminadmin" 
            })
            .then((res)=>{
                token = res.body.token
                expect(res.body).toHaveProperty("token")    
            })
    })
    test('it should validate mismatch password', async ()=>{
        await request(app)
            .post("/login")
            .send({
                email: "admin@admin.com",
                password:"admin"
            })
            .then((res)=>{
                expect(res.body).toHaveProperty("error")
            })
    })

    test('it should have unauthorized status', async ()=>{
        await request(app)
            .get('/user/profile')
            .expect(401)
    })
    
    test('it should can fetch profile current user', async ()=>{
        await request(app)
            .get('/user/profile')
            .set('authorization', `Bearer ${token}`)
            .then((res)=>{
                expect(res.body).toHaveProperty("_id")
            })
    })
})