import { Request, Response } from 'express';
import * as ProductService from '../services/ProductService';

export async function doGet(req: Request, res: Response) {
   const param = await req.query.search as string;
   if (param) {
      const result = await ProductService.searchProducts(param);
      res.status(result.isSuccess? 200 : 400).json(result);
   }
   else {
      const result = await ProductService.getProducts();
      res.status(result.isSuccess? 200 : 500).json(result.data);
   }
}


export async function doPost(req: Request, res: Response) {
   const { supplier, category } = req.body;
   if (!req.file)
      res.status(400).send('No file uploaded');

   else {
      const result = await ProductService.createProduct(req.file.filename);
      if (result.isSuccess)
         res.status(200).json(result);
      else
      res.status(500).json(result);
   }
}
