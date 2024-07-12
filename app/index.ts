import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"

const app = express();

app.use(bodyParser.json());
// app.use('/cloth-items', require('./routes/ClothItemRoutes'));

import productRouter from './routes/ProductRoutes';
app.use('/products', productRouter);

import employeeRouter  from './routes/EmployeeRoutes';
app.use('/employee', employeeRouter)

export default app;
