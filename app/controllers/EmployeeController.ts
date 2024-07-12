import { Request, Response } from 'express';
import { getEmployee } from "../services/EmployeeService";

export async function doGet(req:Request, resp: Response) {
    const data = await getEmployee();
    console.log(data);
    resp.status(200).send(data);
    
}