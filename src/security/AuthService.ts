import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRED } from '../config';
import { injectable } from 'inversify';
@injectable()
export default class AuthService{
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
    getPayload(token): object{
        try{
            let jwtPayload = jwt.verify(token, JWT_SECRET) as object
            return jwtPayload
        }catch(e){
            return {
                error: 'Invalid Token.'
            }
        }
    }
}