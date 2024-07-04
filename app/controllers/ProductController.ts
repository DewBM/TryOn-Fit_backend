import { Request, Response } from 'express';
import { getProducts } from '../services/ProductService';

export async function doGet(req: Request, res: Response) {
   const data = await getProducts();
   console.log(data);
   res.status(200).send(data);
}
