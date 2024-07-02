import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { AppDataSource } from './data-source';
// import routes from './routes';

const app = express();

app.use(bodyParser.json());
// app.use('/api', routes);

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))

module.exports = app;