import { Container } from "inversify";
import MongoMemoryConnection from "../../../src/utils/mongodb/memory-connection";

describe('Testing Database Initializer Bootstrap', ()=>{
    beforeAll(async ()=>{
        await MongoMemoryConnection.getConnection()
        
    })
})