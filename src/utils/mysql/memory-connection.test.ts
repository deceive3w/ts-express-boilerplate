import DBConnection from "./db-connection"
import { Connection } from "typeorm"
import MemoryConnection from "./memory-connection"

describe('Test Memory Connection',()=>{
    let connection: Connection
    beforeAll(async ()=>{
        connection = await MemoryConnection.openConnection()
    })

    it('should connection opened', ()=>{
        expect(connection.isConnected).toBe(true)
        connection.close()
    })
})