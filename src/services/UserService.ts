import { inject, injectable } from "inversify";
import UserRepository from "../repositories/UserRepository";
import { User } from "../models/User";
import { Repository } from "../types";

@injectable()
export default class UserService {
    @inject('UserRepository') userRepository: Repository<User>
    async createUser(user: User){
        return this.userRepository.create(user)
    }

    authenticate(email: string, password: string){
        
    }
}