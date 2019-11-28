import mongoose, { Mongoose } from 'mongoose'
import {  MongoMemoryServer } from 'mongodb-memory-server'
const mongod = new MongoMemoryServer();

class MongoMemoryConnection {
    static url: string
    static async getConnection(){
        const uri = await mongod.getConnectionString();
        return mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    }

     static async close(){
        return mongoose.disconnect()
    }
}
export default MongoMemoryConnection