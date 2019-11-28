import DBConnection from "../utils/mongodb/db-connection";
import { injectable, inject } from "inversify";
import { RoleService } from "../interfaces";
import { ACTION } from "../types";

@injectable()
export default class DatabaseInitializer {
    @inject('RoleService') roleService: RoleService
    async seedRole(){
        try{
            
        }catch(e){
            console.log(e)
        }

    }
    
    async seed(){
        await this.seedRole()
    }
}