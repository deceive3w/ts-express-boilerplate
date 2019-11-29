import { User,  UserModel} from '../../../src/models';
import { Container } from 'inversify';
import request from 'supertest'
import server from '../../../src/utils/express/server'
import express from 'express'
import UserRepository from '../../../src/repositories/UserRepository';
import AuthService from '../../../src/security/AuthService';
import AuthProvider from '../../../src/security/AuthProvider'
import MongoMemoryConnection from '../../../src/utils/mongodb/memory-connection'
import { UserService, RoleService, PrivilegeService } from '../../../src/interfaces'
import { UserServiceImpl, RoleServiceImpl, PrivilegeServiceImpl } from '../../../src/services';
import { AuthMiddleware } from '../../../src/middlewares'
import { TYPES } from '../../../src/types';
import { RoleRepository, PrivilegeRepository } from '../../../src/repositories';
import Principal from '../../../src/security/Principal';

//import controllers
import { RoleController, UserController } from '../../../src/controllers';

describe("Role Controller Test", ()=>{
    let container: Container = new Container()
    let app: express.Application
    let token: string
    beforeAll(async ()=>{
        await MongoMemoryConnection.getConnection()
        container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
        container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
        container.bind<AuthService>(TYPES.AuthService).to(AuthService)
        container.bind<AuthProvider>(TYPES.AuthProvider).to(AuthProvider)
        container.bind<RoleService>(TYPES.RoleService).to(RoleServiceImpl)
        container.bind<UserController>(TYPES.UserController).to(UserController)
        container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)
        container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository)
        container.bind<PrivilegeRepository>(TYPES.PrivilegeRepository).to(PrivilegeRepository)
        container.bind<PrivilegeService>(TYPES.PrivilegeService).to(PrivilegeServiceImpl)
        container.bind<Principal>("Principal").to(Principal)
        container.bind('UserModel').to(UserModel)
        app = server(container, AuthProvider).build()
    })

    test('it should can register admin with role', async ()=>{
        let adminRole = await container.get<RoleService>(TYPES.RoleService).createRole({
            name:'superadmin',
            privileges:[{privilege: 'CREATE_ROLE'}, {privilege:'FIND_ROLE'}, {privilege:'DELETE_ROLE'}, {privilege:'UPDATE_ROLE'}],
        })

        let user = await container.get<UserService>(TYPES.UserService).register({
            email:"admin@admin.com",
            firstName:'admin',
            password:'admin',
            roles: [adminRole._id]
        })
        token = user.token
        
        let userWithRole = await container.get<UserService>(TYPES.UserService).findById(user._id)
        expect(userWithRole.roles).toHaveLength(1)
    })

    test('it should can find all role', async()=>{
        await request(app)
            .get('/role')
            .set('authorization', `Bearer ${token}`)
            .expect(200)
            .then((res)=>{
                expect(res.body).toBeInstanceOf(Array)
            })
    })
    
    test('it should can create role', ()=>{

    })
})