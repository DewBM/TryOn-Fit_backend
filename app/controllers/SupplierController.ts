import { Request, Response } from 'express';
import { createSupplier, getSupplier , updateSupplier,deleteSupplier} from "../services/SupplierService"

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
    const supid ="";
    
    try{
        const data = await updateSupplier(req.body, supid);
        resp.status(201).send(data);
    }catch(error){
        resp.status(500).send({error : 'Failed to create Supplier'})
    }
    
}

export async function doDelete(req : Request , resp : Response) {
    const id = "";
    console.log(req.body);
    try{
        const data = await deleteSupplier(req.body);
        resp.status(201).send(data);
    }catch(error){
        resp.status(500).send({error : 'Failed to create Supplier'})
    }
    
}