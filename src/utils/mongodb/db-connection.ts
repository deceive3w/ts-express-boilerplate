import mongoose, { Mongoose } from 'mongoose'
import { MONGODB } from '../../config';

class DBConnection {
    static url: string = MONGODB
    static getConnection(connection){
        return mongoose.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,}).then((conn: Mongoose)=>{
            connection(conn)
        })
    }
}
export default DBConnection