import {createConnection, Connection} from "typeorm";
import Post from "../../models/Post";
import { Poll } from "../../models";
import Prediction from "../../models/Prediction";
import UserPredict from "../../models/UserPredict";
import Follow from "../../models/Follow";

export default class DBConnection {
    static async openConnection(){
        const connection = await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "rekeningku_socmed",
            entities:[Post, Poll, Prediction, UserPredict, Follow ],
            synchronize:true
        });
        
        return connection
    }
}