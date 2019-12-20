import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRED } from '../config';
import { injectable } from 'inversify';
import AuthService from '../interfaces/security/AuthService.interface';
import axios from 'axios'
@injectable()
export default class AuthServiceImpl implements AuthService{
    hashPassword(password: string){
        return bcrypt.hashSync(password, 8)
    }
    checkPasswordAndHashIsValid(password: string, hash: string){
        return bcrypt.compareSync(password, hash)
    }
    generateToken(payload: object){
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRED,
        })
    }
    async getPayload(token): Promise<any>{
        if(!token){
            return Promise.reject("Invalid Token.")
        }
        let url = "http://api.rekeningku.net/profile"
        let result = await axios({
            url,
            method:'post',
            headers:{
                token
            }
        })
        return result.data
    }
}