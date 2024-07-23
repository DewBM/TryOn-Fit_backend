import { Request, Response } from 'express';
import * as ProductService from '../services/ProductService';
import productRrouter from '../routes/ProductRoutes';

export async function doGet(req: Request, res: Response) {
   const data = await ProductService.getProducts();
   console.log(data);
   res.status(200).send(data);
}


export async function doPost(req: Request, res: Response) {
   const data = req.body;
   console.log(data);
   ProductService.createProduct(data);
   res.status(200).json({msg: 'product received.'});
}
