import mongoose, { Document } from "mongoose"

export interface User{
    _id?: string,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
}

var UserSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String}
})

interface UserType extends User, Document{
    _id: string
}

export default mongoose.model<UserType>('user', UserSchema, 'user')