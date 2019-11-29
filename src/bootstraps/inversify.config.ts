import { Container } from "inversify";
import { UserService, RoleService, Principal as IPrincipal, PrivilegeService} from "../interfaces";
import { UserServiceImpl, RoleServiceImpl, PrivilegeServiceImpl } from "../services";
import { AuthMiddleware } from "../middlewares";
import { UserController, RoleController } from "../controllers";
import { UserRepository, RoleRepository, PrivilegeRepository } from "../repositories";
import AuthService from "../security/AuthService";
import { UserModel } from "../models";
import { TYPES } from "../types";
import DatabaseInitialization from "./DatabaseInitializer";
import Principal from "../security/Principal";
import AuthProvider from "../security/AuthProvider";


let container = new Container();
container.bind<DatabaseInitialization>(TYPES.DatabaseInitilizer).to(DatabaseInitialization)

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware)
container.bind<AuthProvider>(TYPES.AuthProvider).to(AuthProvider)
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<IPrincipal>(TYPES.Principal).to(Principal)

container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl)
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<RoleController>(TYPES.RoleController)
container.bind<RoleService>(TYPES.RoleService).to(RoleServiceImpl)
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepository)

container.bind<PrivilegeRepository>(TYPES.PrivilegeRepository).to(PrivilegeRepository)
container.bind<PrivilegeService>(TYPES.PrivilegeService).to(PrivilegeServiceImpl)

export { container }