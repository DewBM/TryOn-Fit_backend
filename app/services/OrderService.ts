import { getServerActionDispatcher } from "next/dist/client/components/app-router";
import { insertNewOrder, queryItemsByOrderId, queryOrders, queryOrdersByCustomer, updateOrderStatus , getOrdersByStatus } from "../db/dao/orderDAO";
import { OrderInsert, OrderItemInsert } from "../db/schema/Order";
import { StatusType } from "../types/custom_types"
import { queryOrderItemsWithDetails } from '../db/dao/orderDAO'; 

export async function getAllOrders() {
   return await queryOrders();
}


export async function getItemsByOrderId(order_id: number) {
   return await queryItemsByOrderId(order_id);
}


export async function getOrdersByCustomer(customer_id: number) {
   return await queryOrdersByCustomer(customer_id);
}


export async function createOrder(order: OrderInsert & {order_items: OrderItemInsert[]}) {
   return await insertNewOrder(order);
}


export async function updateStatus(order_id: number, status: StatusType) {
   return await updateOrderStatus(order_id, status);
}

export async function fetchOrdersByStatus(status: StatusType) {
   return await getOrdersByStatus(status);
}



export async function getOrderItemsWithDetails(order_id: number) {
   if (!order_id) {
      return {
         isSuccess: false,
         data: null,
         msg: "Invalid order ID provided.",
         error: null,
      };
   }

   try {
      const result = await queryOrderItemsWithDetails(order_id);

      if (!result.isSuccess) {
         
         return {
            isSuccess: false,
            data: null,
            msg: result.msg || "Failed to retrieve order items.",
            error: result.error,
         };
      }

      return {
         isSuccess: true,
         data: result.data,
         msg: "Order items fetched successfully.",
         error: null,
      };
   } catch (error) {
      console.error("Service Error fetching order items:", error);
      return {
         isSuccess: false,
         data: null,
         msg: "An unexpected error occurred while fetching order items.",
         error,
      };
   }
}