import { Request, Response } from 'express';
import { readProductExcel } from '../utils/excel';
import path from 'path';
import * as ProductService from '../services/ProductService';
import { Product } from '../db/schema/Product';

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
   if (!req.file)
      res.status(400).send('No file uploaded');

   else {
      const result = await ProductService.createProduct(req.file.filename);
      if (result.isSuccess)
         res.status(200).json(result);
      else
      res.status(400).json(result);
   }

   // const excelRes = await readProductExcel(path.join(process.env.EXCEL_UPLOADS!, req.file.filename));
   // console.log(excelRes);

   // if (excelRes && excelRes?.isSuccess) {
   //    const product = excelRes.data as Product;
   //    const result = await ProductService.createProduct(product);
      // res.status(200).json(result);
   // }
   // else
      // res.status(500).send('Something went wrong');

   // if (result.isSuccess)
   //    res.status(200).json(result);
   // else {
   //    console.log('Product insert error: ', result);
   //    res.status(400).json({isSuccess: result.isSuccess, msg: result.msg});
   // }
}
