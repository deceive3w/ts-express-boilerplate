import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from 'body-parser';
import '../../controllers/UserController'
import express from 'express'
export default (container) =>{
    const app = express()
    let server = new InversifyExpressServer(container, null, null, app);
    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });
    return server
}