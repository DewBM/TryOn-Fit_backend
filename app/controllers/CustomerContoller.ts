import { Request, Response } from "express";
import { getCustomerByCustomerId } from "../services/CustomerService";
// import { updateCustomer } from "../services/CustomerService";
import { getAddressByCustomerId } from "../db/dao/addressDAO";

export async function doGet(req: Request, res: Response) {
  try {
    console.log("Fetching customer and address details...");
    const customer_id = req.query.customer_id as string;

    if (!customer_id) {
      return res.status(400).json({
        isSuccess: false,
        data: null,
        msg: "Customer ID is required",
        error: "Missing customer_id in query",
      });
    }

    // Fetch Customer
    const customerResult = await getCustomerByCustomerId(parseInt(customer_id, 10));
    if (!customerResult.isSuccess) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        msg: "Could not get customer data",
        error: customerResult.error,
      });
    }

    const customer = customerResult.data;

    // Fetch Address
    const addressResult = await getAddressByCustomerId(parseInt(customer_id, 10)); // Use customer_id
    if (!addressResult.isSuccess) {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        msg: "Could not get address data",
        error: addressResult.error,
      });
    }

    const address = addressResult.data;

    // Combine Results
    const combinedData = {
      customer,
      address,
    };

    // Respond with Combined Data
    res.status(200).json({
      isSuccess: true,
      data: combinedData,
      msg: "Successfully fetched customer and address details",
      error: "",
    });
  } catch (error) {
    console.error("Error in fetching customer and address details:", error);
    res.status(500).json({
      isSuccess: false,
      data: null,
      msg: "An unexpected error occurred",
      error,
    });
  }
}


// export async function doPut(req : Request , res : Response) {
//   const { customer_id } = req.body;
  
//   try {
//       const data = await updateCustomer(req.body, customer_id); 
//       res.status(200).send(data);
//   } catch (error) {
//       res.status(500).send({ error: 'Failed to update profile' });
//   }
// }


