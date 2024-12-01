import { Request, Response } from 'express';
import { getRevenueBySupplier } from '../services/ReportService';

export async function doGet(req:Request,resp: Response) {
    try {
        console.log("1")
        const data = await getRevenueBySupplier();
        console.log(data);
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({error : "Faild to get revenue"})
    }
    
}

