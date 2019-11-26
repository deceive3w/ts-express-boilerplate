import { User } from "../models";
import { LoginSuccess } from "../types";

export default interface UserService {
    register(user: User): Promise<User>
    login(email: string, password: string): Promise<LoginSuccess>
    findById(_id: string): Promise<User>
}