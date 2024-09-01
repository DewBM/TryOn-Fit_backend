import { Request, Response } from "express";
import { getCustomerByCustomerId } from "../services/CustomerService";

export async function doGet(req: Request, res: Response) {
  const customer_id = req.query.customer_id as string;
  if (customer_id) {
      const result = await getCustomerByCustomerId(parseInt(customer_id, 10));
    if(result.isSuccess){
      res.status(200).json(result);  
  } else {
    res.status(500).json({error: "Could not get customer data" });
  }
}
