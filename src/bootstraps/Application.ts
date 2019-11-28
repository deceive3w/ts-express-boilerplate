import DBConnection from "../utils/mongodb/db-connection";
import DatabaseInitilizer from "./DatabaseInitializer";
import { container } from './inversify.config'
import { TYPES } from "../types";
import server from "../utils/express/server";
import AuthProvider from "../security/AuthProvider";
import { HOST_PORT } from "../config";

import '../controllers'
export default class Application {
    static async run(){
        await DBConnection.openConnection()
        await container.get<DatabaseInitilizer>(TYPES.DatabaseInitilizer).seed()
        server(container, AuthProvider).build().listen(HOST_PORT, ()=>{
            console.log("Server is start at port "+HOST_PORT)
        })
    }
}