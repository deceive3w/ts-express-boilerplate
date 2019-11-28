import mongoose, { Document } from "mongoose"
import { ACTION } from "../types";
import { User } from "./User";
import { Privilege } from "./Privilege";

export interface Role{
    _id?: string,
    name?: string,
    users?: User[],
    privileges?: Privilege[] | string[]
}

var RoleSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    users: [{type: String}],
    privileges: [{type: mongoose.Types.ObjectId, ref: 'Privilege'}]
})

interface RoleType extends Role, Document{
    _id: string
}

export default mongoose.model<RoleType>('Role', RoleSchema, 'Role')