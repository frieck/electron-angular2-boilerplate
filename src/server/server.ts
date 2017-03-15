import * as express from 'express';
import * as http from 'http';

//import * as fs from 'fs';
//import * as path from 'path';
//import * as log4js from 'log4js';

export class Server {
    private server;
    private logger;

    constructor(private port: Number) {
        console.log('Configuring server on port', this.port);

        /*
        var logDirectory = path.join(__dirname, 'log-' + process.env.NODE_ENV);
        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        log4js.configure({
            appenders: [{
                type: 'file',
                filename: 'log-' + process.env.NODE_ENV + '/express.log',
                category: 'express'
            }]
        });
        logger = log4js.getLogger('express');
        */

        let cookieParser = require('cookie-parser');
        let bodyParser = require('body-parser');
        let methodOverride = require('method-override');
        let session = require('express-session');

        let app = express();
        this.server = http.createServer(app);

        // Read cookies (needed for authentication)
        app.use(cookieParser());

        // Parse application/json
        app.use(bodyParser.json());
        // Parse application/vnd.api+json as json
        app.use(bodyParser.json({
            type: 'application/vnd.api+json'
        }));
        // Parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        // Session secret
        app.use(session({

            secret: process.env.SESSION_SECRET || 'testesecretteste',

            resave: true,

            saveUninitialized: true
        }));

        // Get an instance of the express Router
        let router = express.Router();
        router.use((req, res, next) => {

            console.log('I sense a disturbance in the force...'); // DEBUG

            // Make sure we go to the next routes and don't stop here...
            next();
        });

        // Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
        app.use(methodOverride('X-HTTP-Method-Override'));
        app.use(express.static(__dirname));
    }

    public start(): void {
        this.server.listen(this.port);
        // Shoutout to the user
        //console.log(`Wizardry is afoot on port ${port}`);
    }
}