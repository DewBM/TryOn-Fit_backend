import { insertNewOrder, queryItemsByOrderId, queryOrders, queryOrdersByCustomer, updateOrderStatus , getOrdersByStatus } from "../db/dao/orderDAO";
import { OrderInsert, OrderItemInsert } from "../db/schema/Order";
import { StatusType } from "../types/custom_types"

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

// Service function to fetch all orders
export async function fetchAllOrders() {
   return await getAllOrders();
}
