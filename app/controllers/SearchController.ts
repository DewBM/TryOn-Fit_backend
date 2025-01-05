import { Request, Response } from "express";
import * as ProductService from '../services/ProductService';

export async function doGet(req: Request, res: Response) {
    const param = req.query.prompt? req.query.prompt as string : "";

    const result = await ProductService.searchProducts(param);
    res.status(result.isSuccess? 200 : 400).json(result);
}