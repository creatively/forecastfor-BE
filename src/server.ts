//import { Request, Response, Application } from 'express';   // Next
import express = require('express');
import cors from 'cors'
import bodyParser from 'body-parser';
import forecast from '../routes/forecast'

const app = express();
const port: number | string = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
        credentials: true,
        origin: [
            'http://localhost:8080',
            'http://localhost:3000',
            'http://forecastfor.com'
        ]
    }))

// routes
app.use('*', forecast)


// start server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
