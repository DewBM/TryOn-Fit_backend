import { Request, Response } from "express";
import { getAddressByCustomerId } from "../db/dao/addressDAO";
import { updateCustomerByCustomerId } from "../services/CustomerService";
import { updateAddressByCustomerId } from "../db/dao/addressDAO";
import { getCustomerByCustomerId,storeBodyMeasurements,getCustomerId} from "../services/CustomerService";

export async function doGet(req: Request, res: Response) {
  const userId = req.user?.userId;  // userId should be part of req.user, check console log for debugging

  console.log("userID=" + userId);  // Debugging line to ensure it's properly set

  if (!userId || typeof userId !== "number") {
    return res.status(400).json({
      isSuccess: false,
      msg: "Invalid or missing User ID.",
    });
  }

  try {
    const customer = await getCustomerByCustomerId(userId);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      msg: "Error fetching customer details.",
      error,
    });
  }
}



// export async function doPut(req: Request, res: Response) {
//   try {
//     console.log("Updating customer and address data...");
    
//     const customer_id = req.query.customer_id as string;
//     const updatedData = req.body; 

    
//     if (!customer_id) {
//       return res.status(400).json({
//         isSuccess: false,
//         data: null,
//         msg: "Customer ID is required",
//         error: "Missing customer_id in query",
//       });
//     }

    
//     if (!updatedData || Object.keys(updatedData).length === 0) {
//       return res.status(400).json({
//         isSuccess: false,
//         data: null,
//         msg: "Updated data is required",
//         error: "No data provided to update",
//       });
//     }

    
//     const { customer, address } = updatedData;

   
//     if (customer) {
//       const customerUpdateResult = await updateCustomerByCustomerId(
//         parseInt(customer_id, 10),
//         customer
//       );
//       if (!customerUpdateResult.isSuccess) {
//         return res.status(500).json({
//           isSuccess: false,
//           data: null,
//           msg: customerUpdateResult.msg,
//           error: customerUpdateResult.error,
//         });
//       }
//     }

    
//     if (address) {
//       const addressUpdateResult = await updateAddressByCustomerId(
//         parseInt(customer_id, 10),
//         address
//       );
//       if (!addressUpdateResult.isSuccess) {
//         return res.status(500).json({
//           isSuccess: false,
//           data: null,
//           msg: addressUpdateResult.msg,
//           error: addressUpdateResult.error,
//         });
//       }
//     }

    
//     res.status(200).json({
//       isSuccess: true,
//       data: {
//         customer: customer ? customer : null,
//         address: address ? address : null,
//       },
//       msg: "Customer and address updated successfully.",
//       error: "",
//     });
//   } catch (error) {
//     console.error("Error in updating customer and address data:", error);
//     res.status(500).json({
//       isSuccess: false,
//       data: null,
//       msg: "Error occurred while updating customer and address data",
//       error,
//     });
//   }
// }

//bodymeasurement 
export async function addMeasurements(req: Request, res: Response) {
  const userId = req.user?.userId;
  console.log("userID=" + userId);  // Debugging line to ensure it's properly set

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




export async function  doGetCustomerId(req: Request, res: Response) {
  try {
    // Extract `user_id` from query parameters or request body
    const userId = parseInt(req.query.user_id as string);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid or missing user_id" });
    }

    // Call the service function to fetch the customer_id
    const customerId = await getCustomerId(userId);

    if (customerId) {
      return res.status(200).json({ customer_id: customerId });
    } else {
      return res.status(404).json({ message: "Customer not found for the provided user_id" });
    }
  } catch (error) {
    console.error("Error fetching customer_id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
