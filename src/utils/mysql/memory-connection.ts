import {createConnection, Connection} from "typeorm";
import Post from "../../models/Post";
import { Poll } from "../../models";
import UserPredict from "../../models/UserPredict";
import Follow from "../../models/Follow";
import Prediction from "../../models/Prediction";

export default class MemoryConnection {
    static async openConnection(){
        const connection = await createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities:[Post, Poll, Prediction, UserPredict, Follow ],
            synchronize: true,
            logging: false,
            

        });
        return connection
    }
}