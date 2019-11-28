import mongoose, { Document } from "mongoose"
import { ACTION } from "../types";
import { User } from "./User";
import { Role } from ".";

export interface Privilege{
    _id?: string,
    privilege?: string,
    role?: Role[]|string[]
}

var PrivilegeSchema = new mongoose.Schema({
    privilege: {type: String, required: true},
    roles: [{type: mongoose.Types.ObjectId, ref: 'Roles'}]
})

interface PrivilegeType extends Privilege, Document{
    _id: string
}

export default mongoose.model<PrivilegeType>('Privilege', PrivilegeSchema, 'Privilege')