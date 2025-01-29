import { Request, Response } from 'express';
import { createSupplier, getSupplier , updateSupplier,deleteSupplier , fetchTotalNumberOfSuppliers} from "../services/SupplierService"

export async function doGet( req : Request , resp : Response){
    try{
        console.log("1");
        const data = await getSupplier();
        resp.status(201).send(data);
    }catch(error){
        resp.status(500).send({ error: 'Failed to get Supplier1' });
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
        const data = await updateSupplier(req.body);
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

//Total suppliers

export async function fetchTotalSuppliers(req: Request, res: Response) {
    try {
      const result = await fetchTotalNumberOfSuppliers();
  
      if (result.isSuccess) {
        res.status(200).json({
          success: true,
          data: result.data,
          message: result.msg,
        });
      } else {
        res.status(500).json({
          success: false,
          data: null,
          message: result.msg,
          error: result.error,
        });
      }
    } catch (error) {
      console.error("Error in fetchTotalNumberOfSuppliersController:", error);
      res.status(500).json({
        success: false,
        data: null,
        message: "Controller error while fetching total number of suppliers",
        error,
      });
    }
  }