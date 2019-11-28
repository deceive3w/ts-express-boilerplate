import { User } from "../models";
import { LoginSuccess, RegisterSuccess } from "../types";

export default interface UserService {
    register(user: User): Promise<RegisterSuccess>
    login(email: string, password: string): Promise<LoginSuccess>
    findById(_id: string): Promise<User>
}