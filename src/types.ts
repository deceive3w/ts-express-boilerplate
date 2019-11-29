import { Query, DocumentQuery, Document } from "mongoose";
import { User } from "./models";

export const TYPES = {
    Principal: "Principal",
    AuthMiddleware: "AuthMiddleware",
    AuthService: "AuthService",
    AuthProvider: "AuthProvider",

    UserController: "UserController",
    UserService: "UserService",
    UserRepository: "UserRepository",

    RoleController: "RoleController",
    RoleService: "RoleService",
    RoleRepository: "RoleRepository",


    PrivilegeController: "PrivilegeController",
    PrivilegeService: "PrivilegeService",
    PrivilegeRepository: "PrivilegeRepository",

    DatabaseInitilizer: "DatabaseInitilizer"
}

export enum ACTION {
    createOwn = "createOwn",
    createAny = "createAny",
    updateOwn = "updateOwn",
    updateAny = "updateAny",
    findOwn = "findOwn",
    findAny = "findAny",
    findById = "findById",
    deleteOwn = "deleteOwn",
    deleteAny = "deleteAny",
}

export interface RegisterSuccess extends User {
    token: string
}
export interface LoginSuccess extends User {
    token: string
}
