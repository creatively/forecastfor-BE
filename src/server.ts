import { Request, Response, Application } from 'express';
import express = require('express');
import bodyParser from 'body-parser';
import { ApolloServer } from "apollo-server-express";
import { buildSchema, createResolversMap } from "type-graphql";
import { HelloResolver } from './resolvers/hello'

const main = async () => {

    const app: Application = express();
    const port = 8080; // default port to listen
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ HelloResolver ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });


    // start the Express server
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
}

main().catch((err) => {
    // tslint:disable-next-line: no-console
    console.error(err);
});
