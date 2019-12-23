import { Request, Response, NextFunction } from 'express';
import Principal from './Principal.interface';

export default interface AuthProvider{
    getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Principal>
}