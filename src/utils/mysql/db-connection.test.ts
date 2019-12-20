import DBConnection from "./db-connection"
import { Connection } from "typeorm"

describe('Test Mysql DB Connection',()=>{
    let connection: Connection
    beforeAll(async ()=>{
        connection = await DBConnection.openConnection()
    })

    it('should connection opened', ()=>{
        expect(connection.isConnected).toBe(true)
        connection.close()
    })
})