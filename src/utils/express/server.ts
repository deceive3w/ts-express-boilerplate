import { InversifyExpressServer, interfaces } from "inversify-express-utils";
import bodyParser from 'body-parser';
import express from 'express'
export default (container, authProvider?) =>{
    const app = express()
    let server = new InversifyExpressServer(container, null, null, app, authProvider);
    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });
    return server
}