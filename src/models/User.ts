import mongoose, { Document } from "mongoose"
import { Role } from ".";

export interface User{
    _id?: string,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    roles?: Role[] | string[]
}

var UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    roles: [{type: mongoose.Types.ObjectId, ref: 'Role'}]
})

interface UserType extends User, Document{
    _id: string
}

export default mongoose.model<UserType>('User', UserSchema, 'User')