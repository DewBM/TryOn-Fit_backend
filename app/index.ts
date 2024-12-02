import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

// require('./utils/generateSecretKey'); // Ensure secret key is generated

const app = express();

config({ path: '.env' });

app.use(cors({
    credentials: true, 
    origin: ['http://localhost:3000', '127.0.0.1:3000',]
}));

app.use(cookieParser());
app.use(bodyParser.json());

import productRouter from './routes/ProductRoutes';
import authRouter from './routes/AuthRoutes';

app.use('/products', productRouter);
app.use('/auth', authRouter);

import employeeRouter from './routes/EmployeeRoutes';
app.use('/employee', employeeRouter);

import supplierRouter from './routes/SupplierRoutes';
app.use('/supplier', supplierRouter);

import CustomerRouter from './routes/CustomerRoutes';
app.use('/customer', CustomerRouter);

import inquiryFormRouter from './routes/InquiryFormRoutes';
app.use('/inquiryform', inquiryFormRouter)

import CartRouter from './routes/CartRoutes';

app.use('/cart',CartRouter);
app.use('/auth', authRouter);


import inquiryRouter from './routes/InquiryRoutes';
app.use('/inquiry', inquiryRouter);


import ReportRouter from './routes/ReportRouts';
app.use('/report',ReportRouter)

//update order status
import OrderDistributionRoutes from './routes/OrderDistributionRoutes';
app.use('/order', OrderDistributionRoutes);


export default app;
