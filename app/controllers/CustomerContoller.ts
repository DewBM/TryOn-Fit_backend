import { Request, Response } from "express";
import { getCustomerByCustomerId,storeBodyMeasurements} from "../services/CustomerService";

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
        msg: "Couldnt  get customer data now ",
        error: " ",
      });
    }
  }
}


//bodymeasurement 
export async function addMeasurements(req: Request, res: Response) {
  const userId = req.user?.userId;

  if (!userId || typeof userId !== "number") {
    return res.status(400).json({
      isSuccess: false,
      msg: "Invalid or missing User ID.",
      error: null,
    });
  }

  const measurements = req.body;

  const result = await storeBodyMeasurements(userId, measurements);
  if (result.isSuccess) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
}