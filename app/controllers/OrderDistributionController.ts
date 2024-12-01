import { Request, Response } from 'express';
import { StatusType  } from "../types/custom_types";
import { updateStatus , fetchOrdersByStatus  } from '../services/OrderService'; 
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
export const getOrdersByStatus = async (req: Request, res: Response) => {
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

