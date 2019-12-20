import { Query, DocumentQuery, Document } from "mongoose";

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
