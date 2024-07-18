import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata"
import cookieParser from 'cookie-parser';

// require('./utils/generateSecretKey'); // Ensure secret key is generated

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
// app.use('/cloth-items', require('./routes/ClothItemRoutes'));

import productRouter from './routes/ProductRoutes';
import authRouter from './routes/AuthRoutes';

app.use('/products', productRouter);
app.use('/auth', authRouter)

import employeeRouter  from './routes/EmployeeRoutes';
app.use('/employee', employeeRouter)

export default app;
