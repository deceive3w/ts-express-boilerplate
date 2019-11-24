import mongoose, { Mongoose } from 'mongoose'
import {  MongoMemoryServer } from 'mongodb-memory-server'
const mongod = new MongoMemoryServer();

class MemoryConnection {
    static url: string
    static async getConnection(connection){
        const uri = await mongod.getConnectionString();
        return mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}).then((conn: Mongoose)=>{
            connection(conn)
        })
    }

     static async close(){
        return mongoose.disconnect()
    }
}
export default MemoryConnection