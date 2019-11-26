import { Query, DocumentQuery, Document } from "mongoose";
import { User } from "./models";

export const TYPES = {
    AuthMiddleware: "AuthMiddleware",
    UserRepository: "UserRepository",
    UserService: "UserService",
    AuthService: "AuthService"
}

export interface LoginSuccess{
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
    token: string
}
