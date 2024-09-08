import { Request, Response } from "express";
import {
  getCustomerByCustomerId,
  inputMeasurement,
  updateMeasurement,
} from "../services/CustomerService";

export async function doGet(req: Request, res: Response) {
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

export async function doPost(req: Request, resp: Response) {
  try {
    const data = await inputMeasurement(req.body);
    resp.status(201).send(data);
  } catch (error) {
    resp.status(500).send({ error: "Failed to input Measurement" });
  }
} 

export async function doPut(req: Request, resp: Response) {
  const id = 16;
  console.log(id);
  try {
    const data = await updateMeasurement(req.body);

    resp.status(201).send(data);
  } catch (error) {
    resp.status(500).send({ error: "Failed to update Measurement" });
  }
}