
import { Request, Response } from "express";
import { getOrdersByCustomer } from "../services/OrderService";
import { createOrder } from "../services/OrderService";

  
//   export async function doGet(req: Request, res: Response) {
//     // const customerId = req.user?.userId;
//     const customerId = req.query.customer_id ;

  
//     // Validate the customer ID
//     if (!customerId || typeof customerId !== "number") {
//       return res.status(400).json({
//         isSuccess: false,
//         msg: "Invalid or missing customer ID.",
//       });
//     }
  
//     try {
//       // Fetch orders by customer ID
//       const orders = await getOrdersByCustomer(customerId);
  
//       // Handle cases where no orders are found
//       if (!orders) {
//         return res.status(404).json({
//           isSuccess: false,
//           msg: "No orders found for the customer.",
//         });
//       }
  
//       // Respond with the fetched orders
//       return res.status(200).json({
//         isSuccess: true,
//         data: orders,
//       });
//     } catch (error) {
//       // Handle unexpected errors
//       console.error("Error fetching orders by customer ID:", error);
//       return res.status(500).json({
//         isSuccess: false,
//         msg: "An error occurred while fetching orders.",
//       });
//     }
//   }
  


export async function doGet(req: Request, res: Response) {
  try {
    console.log("Fetching orders by customer ID...");
    
    // Get customer_id from query parameters
    const customer_id = req.query.customer_id as string;

    // Validate that the customer_id exists
    if (!customer_id) {
      return res.status(400).json({
        isSuccess: false,
        data: null,
        msg: "Customer ID is required.",
        error: "Missing customer_id in query.",
      });
    }

    // Parse and validate customer_id as a number
    const customerId = parseInt(customer_id, 10);
    if (isNaN(customerId)) {
      return res.status(400).json({
        isSuccess: false,
        data: null,
        msg: "Invalid Customer ID format.",
        error: "customer_id must be a valid number.",
      });
    }

    // Fetch orders by customer ID
    const orders = await getOrdersByCustomer(customerId);

    // Handle case where no orders are found
    if (!orders ) {
      return res.status(404).json({
        isSuccess: false,
        data: null,
        msg: "No orders found for the given customer.",
      });
    }

    // Respond with the fetched orders
    return res.status(200).json({
      isSuccess: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders by customer ID:", error);
    return res.status(500).json({
      isSuccess: false,
      data: null,
      msg: "An error occurred while fetching orders.",
    
    });
  }
}



export async function doPost(req: Request, res: Response) {
  try {
    console.log("Creating a new order...");

    // Validate the input from the request body
    const { customer_id, order_items } = req.body;

    if (!customer_id || !Array.isArray(order_items) || order_items.length === 0) {
      return res.status(400).json({
        isSuccess: false,
        data: null,
        msg: "Invalid input. 'customer_id' and 'order_items' are required.",
        error: "Missing or invalid order data.",
      });
    }

    // Construct the order object
    const order = {
      customer_id,
      order_items,
    };

    // Call the service function to create a new order
    const result = await createOrder(order);

    // Check if the operation was successful
    if (result) {
      return res.status(201).json({
        isSuccess: true,
        data: result,
        msg: "Order created successfully.",
      });
    } else {
      return res.status(500).json({
        isSuccess: false,
        data: null,
        msg: "Failed to create order.",
        error: "Service returned an error.",
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      isSuccess: false,
      data: null,
      msg: "An error occurred while creating the order.",
    
    });
  }
}

