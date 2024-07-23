import { Request, Response } from 'express';
import * as ProductService from '../services/ProductService';

export async function doGet(req: Request, res: Response) {
   const data = await ProductService.getProducts();
   console.log(data);
   res.status(200).send(data);
}


export async function doPost(req: Request, res: Response) {
   const data = req.body;
   const result = await ProductService.createProduct(data);
   if (result.isSuccess)
      res.status(200).json(result);
   else {
      console.log('Product insert error: ', result);
      res.status(400).json({isSuccess: result.isSuccess, msg: result.msg});
   }
}
