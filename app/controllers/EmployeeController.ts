import { Request, Response } from 'express';
import { createEmployee, getEmployee , updateEmployee,deleteEmployee } from "../services/EmployeeService";
import { createNewEmployee } from '../db/dao/employeeDao';
import { Param } from 'drizzle-orm';
import qs from 'qs';



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


export async function doPut(req : Request , resp : Response) {
   
    const id = 16;
    console.log(id);
    try {
        const data = await updateEmployee(req.body, id);
        
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to update employee' });
    }
}

export async function doDel(req : Request , resp : Response) {
       
    const id = 27;
    console.log(id);
    try {
        const data = await deleteEmployee( id);
        
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to update employee' });
    }
}

