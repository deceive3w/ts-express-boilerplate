import { Query, DocumentQuery, Document } from "mongoose";
import { User } from "./models";


export interface Repository<M>{
    create(data:M): Promise<M>
    update(condition: M, data: M): Promise<{updatedCount?: number}>
    delete(condition: M): Promise<{deletedCount?: number}>
    find(param?: M): Promise<M[]>
    findById(id: string): Promise<M | null>
}

export interface LoginSuccess{
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    token: string
}
export interface IUserService{
    register(user: User): Promise<User>
    login(email: string, password: string): Promise<LoginSuccess>
}