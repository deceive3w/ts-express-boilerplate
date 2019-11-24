import "reflect-metadata";
import { Container } from "inversify";
import { UserModel, User } from "../models";
import UserRepository from "./UserRepository";
import mongoose, { Mongoose } from "mongoose";
import MongoMemoryConnection from '../utils/mongodb/memory-connection'
import MemoryConnection from "../utils/mongodb/memory-connection";
describe('Testing User Repository', ()=>{
    let container = new Container()

    beforeAll(async (done)=>{
        await MongoMemoryConnection.getConnection((connection)=>{
            container.bind('UserModel').to(UserModel)
            container.bind('UserRepository').to(UserRepository)
            done()
        })
    })

    test('it should can create', async()=>{
        const create = await container.get<UserRepository>('UserRepository').create({
            email:"myemail1@gmail.com",
            password:"mysecret",
            firstName: "deceive",
            lastName:"3w",
        })
        expect(create).toHaveProperty("_id")
    })

    test('it should can find', async ()=>{
        const data = await container.get<UserRepository>('UserRepository').find()
        expect(data).toHaveLength(1)
    })

    test('it should can find by id', async ()=>{
        const create = await container.get<UserRepository>('UserRepository').create({
            email:"myemail2@gmail.com",
            password:"mysecret",
            firstName: "deceive",
            lastName:"3w",
        })
        const data = await container.get<UserRepository>('UserRepository').findById(create._id)
        expect(data).toHaveProperty("_id")
    })
    test('it should can update', async ()=>{
        const create = await container.get<UserRepository>('UserRepository').create({
            email:"myemail3@gmail.com",
            password:"mysecret",
            firstName: "deceive",
            lastName:"3w",
        })
        const data = await container.get<UserRepository>('UserRepository').update({
            _id: create._id
        }, {
            firstName:"second account"
        })
        expect(data).toEqual({
            updatedCount: 1
        })
    })
    
    test('it should can delete', async ()=>{
        const create = await container.get<UserRepository>('UserRepository').create({
            email:"myemail4@gmail.com",
            password:"mysecret",
            firstName: "deceive",
            lastName:"3w",
        })
        let data = await container.get<UserRepository>('UserRepository').delete({_id: create._id})
        expect(data).toEqual({
            deletedCount: 1
        })
    })

    test('it should can find by param', async ()=>{
        const data = await container.get<UserRepository>('UserRepository').find({
            firstName: "deceive",
        })
        expect(data.length).toBeGreaterThan(1)
    })

    afterAll(async (done)=> {
        await MemoryConnection.close()
        done();
    });
})
