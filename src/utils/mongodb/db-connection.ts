import mongoose, { Mongoose } from 'mongoose'
import { MONGODB } from '../../config';

class DBConnection {
    static url: string = MONGODB
    static openConnection(){
        return mongoose.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,})
    }
}
export default DBConnection