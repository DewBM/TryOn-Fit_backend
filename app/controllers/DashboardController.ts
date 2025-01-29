import { Request, Response } from 'express';
import { getTotalEmployee } from '../services/DashboardService'; // Adjust the import path as necessary

export async function doGet(req: Request, res: Response) {
    const data = await getTotalEmployee();
    console.log(data);
    res.status(200).send(data);
}