import { Container } from "inversify";
import { UserService, RoleService } from "../interfaces";
import { UserServiceImpl, RoleServiceImpl } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserController, RoleController } from "../controllers";
import { UserRepository, RoleRepository } from "../repositories";
import AuthService from "../security/AuthService";
import { UserModel } from "../models";
import { TYPES } from "../types";
import DatabaseInitialization from "./DatabaseInitializer";


let container = new Container();
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)

container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<RoleController>(TYPES.RoleController)
container.bind<RoleService>(TYPES.RoleService).to(RoleServiceImpl)
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository)

container.bind<DatabaseInitialization>(TYPES.DatabaseInitilizer).to(DatabaseInitialization)

export { container }