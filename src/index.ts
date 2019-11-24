import "reflect-metadata";
import  express from 'express'
import DBConnection from './utils/mongodb/db-connection'
import bodyParser from 'body-parser'
import { HOST_PORT } from './config'
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { container } from './inversify.config'

// declare metadata by @controller annotation
import  "./controllers";

const app = express()

DBConnection.getConnection((connection)=>{
    let server = new InversifyExpressServer(container, null, null, app);
    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());

    });
    server.build().listen(HOST_PORT, () => {
        console.log(`Server started on port ${HOST_PORT}!`);
    });
})