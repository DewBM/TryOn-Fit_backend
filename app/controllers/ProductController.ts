import { Request, Response } from 'express';
import { getProducts } from '../services/ProductService';
import { Param } from 'drizzle-orm';
import qs from 'qs';

export async function doGet(req: Request, resp: Response) {
   const data = await getProducts();
   console.log(data);
   resp.status(200).send(data);
   
  }
