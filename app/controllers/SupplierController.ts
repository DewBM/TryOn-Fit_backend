import { Request, Response } from 'express';
import { createSupplier, getSupplier , updateSupplier} from "../services/SupplierService"

export async function doGet( req : Request , resp : Response){
    try{
        const data = await getSupplier();
        resp.status(201).send(data);
    }catch(error){
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
}



export async function doPost( req: Request , resp: Response){
    
    try {
        const data = await createSupplier(req.body);
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ error: 'Failed to create Supplier' });
    }
} 

export async function doPut(req : Request , resp : Response) {
    try{
        const data = await updateSupplier(req.body);
        resp.status(201).send(data);
    }catch(error){
        resp.status(500).send({error : 'Failed to create Supplier'})
    }
    
}