import { inject, injectable } from "inversify";
import { User } from "../models/User";
import { LoginSuccess } from "../types";
import AuthService from '../security/AuthService';
import { UserService,Repository } from "../interfaces";

@injectable()
export default class UserServiceImpl implements UserService {
 
    @inject('UserRepository') userRepository: Repository<User>
    @inject('AuthService') authService: AuthService
    async createUser(user: User){
        return this.userRepository.create(user)
    }
 
    async login(email: string, password: string): Promise<LoginSuccess>{
        let userExists = await this.userRepository.find({
            email
        })
        if(userExists.length > 0){
            const user = userExists[0]
            if(this.authService.checkPasswordAndHashIsValid(password, user.password)){
                const token = this.authService.generateToken({
                    userId: user._id,
                    email: user.email,
                })
                return {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token
                }
            } 
        }
        throw new Error("Email or password is not valid.")
    }
    
    async register(user: User){
        let userExists = await this.userRepository.find({
            email: user.email
        })
        if(userExists.length  > 0){
            throw new Error("Email is already used.")
        }
        user.password = this.authService.hashPassword(user.password)
        let data = await this.userRepository.create(user)
        return {
            _id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
        }
    }

    async findById(_id: string): Promise<User> {
        let user = await this.userRepository.findById(_id)
        return user
    }
}