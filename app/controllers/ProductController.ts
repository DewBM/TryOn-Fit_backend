import { Request, Response } from 'express';
// import * as ProductService from '../services/ProductService';

export async function doGet(req: Request, res: Response) {
   const param = await req.query.search as string;
   if (param) {
      // const result = await ProductService.searchProducts(param);
      // res.status(200).json(result);
   }
   else {
      // const data = await ProductService.getProducts();
      // console.log(data);
      // res.status(200).send(data);
   }
}


export async function doPost(req: Request, res: Response) {
   const { supplier, category } = req.body;
   if (!req.file) {
      return res.status(400).send('No file uploaded');
   }

   console.log(req.file);
   // const result = await ProductService.createProduct(data);
   // if (result.isSuccess)
   //    res.status(200).json(result);
   // else {
   //    console.log('Product insert error: ', result);
   //    res.status(400).json({isSuccess: result.isSuccess, msg: result.msg});
   // }
}
