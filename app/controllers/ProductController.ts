import { Request, Response } from 'express';
import * as ProductService from '../services/ProductService';
const { v4: uuidv4 } = require('uuid');

export async function doGet(req: Request, res: Response) {
   const result = await ProductService.getProducts();
   res.status(result.isSuccess? 200 : 500).json(result.data);
}

export async function doGetCategories(req: Request, res: Response) {
   const result = await ProductService.getCategories();
   res.status(result.isSuccess? 200 : 500).json(result.data);
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


export async function productInsert(req: Request, res: Response) {
   const product = req.body;
   console.log("Product: ", product);

   if (!product) {
      res.status(400).send('No product data');
   }
   else {
      const result = await ProductService.createDirectProduct(product);
      if (result.isSuccess)
         res.status(200).json(result);
      else
      res.status(500).json(result);
   }
}

export async function getProductTemplate(req: Request, res: Response) {
   const { supplier_id, category } = req.body;

   if (supplier_id && category) {
      const buffer = await ProductService.generateProductTemplate(supplier_id, category);

      if (buffer) {
         res.setHeader('Content-Disposition', `attachment; filename="${supplier_id}_${category}_${uuidv4()}.xlsx"`);
         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

         res.status(200).send(buffer);
      }
      else {
         res.status(400).json({
            isSuccess: false,
            msg: "Couldn't create excel template"
         });
      }
   }
   else
      res.status(400).json({
         isSuccess: false,
         msg: 'Supplier ID and/or category cannot be empty',
         error: 'Supplier ID and/or category cannot be empty',
      });
}