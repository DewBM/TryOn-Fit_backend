
import { Request, Response } from "express";
import { getOrdersByCustomer } from "../services/OrderService";
import { createOrder ,createnewOrder} from "../services/OrderService";
import { getCustomerId } from "../services/CustomerService";
import { getorderstatuspage } from "../services/OrderService";
import { fetchOrderId } from "../services/OrderService";


  // export async function doGet(req: Request, res: Response) {
  //   // const customerId = req.user?.userId;
  //   const customerId = req.query.customer_id ;

  
  //   // Validate the customer ID
  //   if (!customerId || typeof customerId !== "number") {
  //     return res.status(400).json({
  //       isSuccess: false,
  //       msg: "Invalid or missing customer ID.",
  //     });
  //   }
  
  //   try {
  //     // Fetch orders by customer ID
  //     const orders = await getOrdersByCustomer(customerId);
  
  //     // Handle cases where no orders are found
  //     if (!orders) {
  //       return res.status(404).json({
  //         isSuccess: false,
  //         msg: "No orders found for the customer.",
  //       });
  //     }
  
  //     // Respond with the fetched orders
  //     return res.status(200).json({
  //       isSuccess: true,
  //       data: orders,
  //     });
  //   } catch (error) {
  //     // Handle unexpected errors
  //     console.error("Error fetching orders by customer ID:", error);
  //     return res.status(500).json({
  //       isSuccess: false,
  //       msg: "An error occurred while fetching orders.",
  //     });
  //   }
  // }
  


export async function doGet(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid or missing User ID.",
      });
    }

    // Fetch customer ID using the userId
    const customerId = await getCustomerId(userId);

   
 

    if (!customerId) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Customer not found for the given User ID.",
      });
    }
    // Parse and validate customer_id as a number
    
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

// export async function doPost(req: Request, res: Response) {
//   try {
//     console.log("Creating a new order...");

//     // Extract input from the request body
//     const {
//       customer_id,
//       order_status,
//       order_date,
//       delivery_date,
//       delivery_address,
//       sub_total,
//       discount,
//     } = req.body;

//     // Validate required fields
//     if (!customer_id || !order_status || !order_date) {
//       return res.status(400).json({
//         isSuccess: false,
//         data: null,
//         msg: "Invalid input. Required fields: 'customer_id', 'order_status', and 'order_date'.",
//         error: "Missing or invalid order data.",
//       });
//     }

//     // Construct the order object
//     const order = {
//       customer_id,
//       order_status,
//       order_date: new Date(order_date), // Convert to Date object
//       delivery_date: delivery_date ? new Date(delivery_date) : null,
//       delivery_address: delivery_address || null,
//       sub_total,
//       discount: discount || 0, // Default to 0 if not provided
//     };

//     // Call the service function to create a new order
//     const result = await createnewOrder(order);

//     // Check the operation result
//     if (result.isSuccess) {
//       return res.status(201).json({
//         isSuccess: true,
//         data: result.data,
//         msg: result.msg,
//       });
//     } else {
//       return res.status(500).json({
//         isSuccess: false,
//         data: null,
//         msg: result.msg,
//         error: result.error,
//       });
//     }
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({
//       isSuccess: false,
//       data: null,
//       msg: "An error occurred while creating the order.",
     
//     });
//   }
// }


export async function doPost(req: Request, res: Response) {
  try {
    console.log("Creating a new order...");

    // Extract input from the request body
    const {
      customer_id,
      order_status,
      order_date,
      delivery_date,
      delivery_address,
      sub_total,
      discount,
      order_items,
    } = req.body;

    // Validate required fields
    if (!customer_id || !order_status || !order_date || !order_items || !order_items.length) {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid input. Required fields: 'customer_id', 'order_status', 'order_date', and 'order_items'.",
        error: "Missing or invalid order data.",
      });
    }

    // Validate date formats
    const orderDateObj = new Date(order_date);
    if (isNaN(orderDateObj.getTime())) {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid date format for 'order_date'.",
        error: "Invalid date.",
      });
    }

    // const deliveryDateObj = delivery_date ? new Date(delivery_date) : null;
    // if (delivery_date && isNaN(deliveryDateObj.getTime())) {
    //   return res.status(400).json({
    //     isSuccess: false,
    //     msg: "Invalid date format for 'delivery_date'.",
    //     error: "Invalid date.",
    //   });
    // }


    const deliveryDateObj = delivery_date ? new Date(delivery_date) : null;


if (delivery_date && (!deliveryDateObj || isNaN(deliveryDateObj.getTime()))) {
  return res.status(400).json({
    isSuccess: false,
    msg: "Invalid date format for 'delivery_date'.",
    error: "Invalid date.",
  });
}


    for (const item of order_items) {
      if (!item.item_id || item.quantity == null || item.price == null) {
        return res.status(400).json({
          isSuccess: false,
          msg: "Invalid order item. Required fields: 'item_id', 'quantity', and 'price'.",
          error: "Missing or invalid order item data.",
        });
      }
    }


    const order = {
      customer_id,
      order_status,
      order_date: orderDateObj,
      delivery_date: deliveryDateObj,
      delivery_address: delivery_address || null,
      sub_total,
      discount: discount || 0,
      order_items,
    };

    const result = await createOrder(order);
    console.log(result)
   
    if (result.isSuccess) {
      return res.status(201).json({
        isSuccess: true,
        msg: result.msg, 
      });
    } else {
      return res.status(500).json({
        isSuccess: false,
        msg: result.msg,
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      isSuccess: false,
      msg: "An error occurred while creating the order.",
    
    });
  }
}


// export async function doPost(req: Request, res: Response) {
//   try {
//     console.log("Creating a new order...");

//     // Extract input from the request body
//     const {
//       customer_id,
//       order_status,
//       order_date,
//       delivery_date,
//       delivery_address,
//       sub_total,
//       discount,
//       order_items,
//     } = req.body;

//     // Validate required fields
//     if (!customer_id || !order_status || !order_date || !order_items || !order_items.length) {
//       return res.status(400).json({
//         isSuccess: false,
//         msg: "Invalid input. Required fields: 'customer_id', 'order_status', 'order_date', and 'order_items'.",
//         error: "Missing or invalid order data.",
//       });
//     }

//     // Validate date formats
//     const orderDateObj = new Date(order_date);
//     if (isNaN(orderDateObj.getTime())) {
//       return res.status(400).json({
//         isSuccess: false,
//         msg: "Invalid date format for 'order_date'.",
//         error: "Invalid date.",
//       });
//     }

    
  

//     // Check if delivery_date is provided and if the date is invalid
//     // if (delivery_date && !(deliveryDateObj instanceof Date) || isNaN(deliveryDateObj.getTime())) {
//     //   return res.status(400).json({
//     //     isSuccess: false,
//     //     msg: "Invalid date format for 'delivery_date'.",
//     //     error: "Invalid date.",
//     //   });
//     // }
    
//   const deliveryDateObj = delivery_date ? new Date(delivery_date) : null;


// if (delivery_date && (!deliveryDateObj || isNaN(deliveryDateObj.getTime()))) {
//   return res.status(400).json({
//     isSuccess: false,
//     msg: "Invalid date format for 'delivery_date'.",
//     error: "Invalid date.",
//   });
// }
//     // Validate each order item
//     for (const item of order_items) {
//       if (!item.item_id || item.quantity == null || item.price == null) {
//         return res.status(400).json({
//           isSuccess: false,
//           msg: "Invalid order item. Required fields: 'item_id', 'quantity', and 'price'.",
//           error: "Missing or invalid order item data.",
//         });
//       }
//     }

//     // Construct the order object
//     const order = {
//       customer_id,
//       order_status,
//       order_date: orderDateObj,
//       delivery_date: deliveryDateObj,
//       delivery_address: delivery_address || null,
//       sub_total,
//       discount: discount || 0,
//       order_items,
//     };

//     // Call the service function to create the order
//     const result = await createOrder(order);
//     console.log(result);

//     if (result.isSuccess) {
//       return res.status(201).json({
//         isSuccess: true,
//         msg: result.msg, // Only include msg, no data
//       });
//     } else {
//       return res.status(500).json({
//         isSuccess: false,
//         msg: result.msg,
//         error: result.error,
//       });
//     }
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return res.status(500).json({
//       isSuccess: false,
//       msg: "An error occurred while creating the order.",
//     });
//   }
// }


export async function getstatus(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid or missing User ID.",
      });
    }

    // Fetch customer ID using the userId
    const customerId = await getCustomerId(userId);

    if (!customerId) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Customer not found for the given User ID.",
      });
    }

    if (isNaN(customerId)) {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid Customer ID format.",
      });
    }

    // Fetch order ID using the customer ID
    const orderId = await fetchOrderId(customerId);

  if (!orderId || typeof orderId !== "number") {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid or missing order ID.",
      });
    }

    // Fetch order status using the order ID
    const results = await getorderstatuspage(orderId);
    if (!results) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Order status not found.",
      });
    }

    // Respond with the order status results
    return res.status(200).json({
      isSuccess: true,
      data: results,
      msg: "Order status fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return res.status(500).json({
      isSuccess: false,
      msg: "An error occurred while fetching the order status.",
    });
  }
}


// export async function getorderId(req: Request, res: Response) {
//   try {
//     const userId = req.user?.userId;

//     if (!userId || typeof userId !== "number") {
//       return res.status(400).json({
//         isSuccess: false,
//         msg: "Invalid or missing User ID.",
//       });
//     }

//     // Fetch customer ID using the userId
//     const customerId = await getCustomerId(userId);

//     if (!customerId) {
//       return res.status(404).json({
//         isSuccess: false,
//         msg: "Customer not found for the given User ID.",
//       });
//     }

//     // Parse and validate customer_id as a number
//     if (isNaN(customerId)) {
//       return res.status(400).json({
//         isSuccess: false,
//         data: null,
//         msg: "Invalid Customer ID format.",
//         error: "customer_id must be a valid number.",
//       });
//     }

//     // Fetch orders by customer ID
//     const orders = await getOrdersByCustomer(customerId);

//     if (!orders || !orders.data || orders.data.length === 0) {
//       return res.status(404).json({
//         isSuccess: false,
//         data: null,
//         msg: "No orders found for the given customer.",
//       });
//     }

//     // Extract the order IDs
//     const orderIds = orders.data.map((order) => order.order_id);

//     // Respond with the order IDs
//     return res.status(200).json({
//       isSuccess: true,
//       orderIds,
//       msg: "Order IDs fetched successfully.",
//     });
//         // Fetch order statuses for each order ID
//     const statuses = await Promise.all(
//           orderIds.map(async (orderId) => {
//             const status = await getorderstatuspage(orderId);
//             return {
//               orderId,
//               status,
//             };
//           })
//         );
    
//         // Respond with the order statuses
//         return res.status(200).json({
//           isSuccess: true,
//           data: statuses,
//           msg: "Order statuses fetched successfully.",
//         });
//   } catch (error) {
//     console.error("Error fetching orders by customer ID:", error);
//     return res.status(500).json({
//       isSuccess: false,
//       data: null,
//       msg: "An error occurred while fetching orders.",
//     });
//   }
// }
export async function getorderId(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        isSuccess: false,
        msg: "Invalid or missing User ID.",
      });
    }

    // Fetch customer ID using the userId
    const customerId = await getCustomerId(userId);

    if (!customerId) {
      return res.status(404).json({
        isSuccess: false,
        msg: "Customer not found for the given User ID.",
      });
    }

    // Parse and validate customer_id as a number
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

    if (!orders || !orders.data || orders.data.length === 0) {
      return res.status(404).json({
        isSuccess: false,
        data: null,
        msg: "No orders found for the given customer.",
      });
    }

    // Extract the order IDs
    const orderIds = orders.data.map((order) => order.order_id);

    // Fetch order statuses for each order ID
    const statuses = await Promise.all(
      orderIds.map(async (orderId) => {
        const status = await getorderstatuspage(orderId);
        return {
          orderId,
          status,
        };
      })
    );

    // Respond with the order statuses
    return res.status(200).json({
      isSuccess: true,
      data: statuses,
      msg: "Order statuses fetched successfully.",
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
