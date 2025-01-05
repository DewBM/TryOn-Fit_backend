import { Request, Response } from 'express';
import { StatusType  } from "../types/custom_types";
import { updateStatus , fetchOrdersByStatus ,fetchAllOrders ,getItemsByOrderId } from '../services/OrderService'; 
// Controller method to update order status
export const doPut = async (req: Request, res: Response) => {
    const { order_id, status } = req.body; 
 
    if (!order_id || !status) {
       return res.status(400).json({
          isSuccess: false,
          msg: 'Order ID and status are required.',
          error: 'Invalid input data',
       });
    }
 
    try {
       const result = await updateStatus(order_id, status);
 
       if (result.isSuccess) {
          return res.status(200).json({
             isSuccess: true,
             msg: result.msg,
             error: result.error,
          });
       } else {
          return res.status(500).json({
             isSuccess: false,
             msg: result.msg,
             error: result.error,
          });
       }
    } catch (error: unknown) {
       const typedError = error as Error;
       console.error(typedError);
 
       return res.status(500).json({
          isSuccess: false,
          msg: "An error occurred while updating the order status.",
          error: typedError.message || 'Unknown error',
       });
    }
 };


 // Controller method to fetch orders by status
export const doGet = async (req: Request, res: Response) => {
   const { status } = req.query; 

   if (!status || typeof status !== "string") {
      return res.status(400).json({
         isSuccess: false,
         msg: "Status is required and should be a valid string.",
         error: "Invalid input data",
      });
   }

   try {
      const orders = await fetchOrdersByStatus(status as StatusType);

      return res.status(200).json({
         isSuccess: true,
         msg: "Orders fetched successfully.",
         data: orders,
         error: "",
      });
   } catch (error: unknown) {
      const typedError = error as Error;
      console.error(typedError);

      return res.status(500).json({
         isSuccess: false,
         msg: "An error occurred while fetching orders.",
         error: typedError.message || "Unknown error",
      });
   }
};



// Controller method to fetch all orders
export const getAllOrders = async (req: Request, res: Response) => {
   try {
      const orders = await fetchAllOrders();  // Call service function to fetch all orders

      return res.status(200).json({
         isSuccess: true,
         msg: "All orders fetched successfully.",
         data: orders,
         error: "",
      });
   } catch (error: unknown) {
      const typedError = error as Error;
      console.error(typedError);

      return res.status(500).json({
         isSuccess: false,
         msg: "An error occurred while fetching orders.",
         error: typedError.message || "Unknown error",
      });
   }
};




export const doGetOrderDetailsById = async (req: Request, res: Response) => {
   const { id } = req.params;

   if (!id || isNaN(Number(id))) {
      return res.status(400).json({
         isSuccess: false,
         msg: "Order ID is required and should be a valid number.",
         error: "Invalid input data",
      });
   }

   try {
      const orderId = parseInt(id, 10);
      const result = await getItemsByOrderId(orderId);

      if (result.isSuccess) {
         return res.status(200).json({
            isSuccess: true,
            msg: "Order details fetched successfully.",
            data: result.data,
            error: "",
         });
      } else {
         return res.status(500).json({
            isSuccess: false,
            msg: result.msg || "Failed to fetch order details.",
            error: result.error || "Unknown error",
         });
      }
   } catch (error: unknown) {
      const typedError = error as Error;
      console.error(typedError);

      return res.status(500).json({
         isSuccess: false,
         msg: "An error occurred while fetching the order details.",
         error: typedError.message || "Unknown error",
      });
   }
};
