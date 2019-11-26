import { interfaces } from "inversify-express-utils";

export default class Principal implements interfaces.Principal{
    
    details: any; 
    constructor(details){
        this.details = details
    }
    isAuthenticated(): Promise<boolean> {
        if(this.details.error){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true)
    }
    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(true)
    }

}