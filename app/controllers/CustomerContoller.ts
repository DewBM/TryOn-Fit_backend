import { Request, Response } from "express";
import { getCustomerByCustomerId } from "../services/CustomerService";
import { updateCustomer } from "../services/CustomerService";

export async function doGet(req: Request, res: Response) {
  console.log(18);
  const customer_id = req.query.customer_id as string;
  if (customer_id) {
    const result = await getCustomerByCustomerId(parseInt(customer_id, 10));
    if (result.isSuccess) {
      res.status(200).json(result);
    } else {
      res.status(500).json({
        isSuccess: false,
        data: null,
        msg: "Could not get customer data",
        error: " ",
      });
    }
  }
}


export async function doPut(req : Request , res : Response) {
  const { customer_id } = req.body;
  
  try {
      const data = await updateCustomer(req.body, customer_id); 
      res.status(200).send(data);
  } catch (error) {
      res.status(500).send({ error: 'Failed to update profile' });
  }
}