import DBConnection from "../utils/mongodb/db-connection";
import { injectable, inject } from "inversify";
import { RoleService, UserService } from "../interfaces";
import { ACTION } from "../types";

@injectable()
export default class DatabaseInitializer {
    @inject('RoleService') roleService: RoleService
    @inject('UserService') userService: UserService
    async seedRole(){
        try{
            let superadmins = await this.roleService.find({name: 'superadmin'})
            if(superadmins.length == 0){
                let roleSuperAdmin = await this.roleService.createRole({
                    name:'superadmin',
                    privileges:[
                        {privilege:'CREATE_ROLE'}, 
                        {privilege:'FIND_ROLE'}, 
                        {privilege:'UPDATE_ROLE'},
                        {privilege:'DELETE_ROLE'}, 
                    ],
                })

                let user = await this.userService.register({
                    email:"superadmin@admin.com",
                    firstName:'superadmin',
                    password:'admin',
                    roles: [roleSuperAdmin._id]
                })
            }
  
        }catch(e){
            console.log(e)
        }

    }
    
    async seed(){
        await this.seedRole()
    }
}