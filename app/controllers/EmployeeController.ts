import { Request, Response } from 'express';
import { createEmployee, getEmployee } from "../services/EmployeeService";
import { createNewEmployee } from '../db/dao/employeeDao';



export async function doGet(req:Request, resp: Response) {
    const data = await getEmployee();
    console.log(data);
    resp.status(200).send(data);
    
}

export async function doPost( req: Request , resp: Response){
    
    try {
        const data = await createEmployee(req.body);
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to create employee' });
    }

} 