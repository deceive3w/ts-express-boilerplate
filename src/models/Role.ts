import mongoose, { Document } from "mongoose"

export interface Role{
    _id?: string,
    name?: string,
    permissions?: [string],
}

var RoleSchema = new mongoose.Schema({
    name: {type: String},
    permissions: [String],
})

interface RoleType extends Role, Document{
    _id: string
}

export default mongoose.model<RoleType>('role', RoleSchema, 'role')