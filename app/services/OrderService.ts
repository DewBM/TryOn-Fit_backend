import { insertNewOrder, queryItemsByOrderId, queryOrders, queryOrdersByCustomer, updateOrderStatus , getOrdersByStatus ,queryOrderDetails , getOrderById , getOrderSummary , getProductVariantById , getOrderItems} from "../db/dao/orderDAO";
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

//get order sttaus byID


export async function getOrderStatus(order_id: number) {
  return await queryOrderDetails(order_id);
}

// new order view part 


export const getOrderDetails = async (orderId: number) => {
   try {
     // Fetch order and related data concurrently for better performance
     const [orderResponse, itemsResponse, summaryResponse] = await Promise.all([
       getOrderById(orderId),
       getOrderItems(orderId),
       getOrderSummary(orderId),
     ]);
 
     // Validate order response
     if (!orderResponse.isSuccess || !orderResponse.data) {
       return {
         isSuccess: false,
         msg: "Order not found.",
         data: null,
         error: orderResponse.error,
       };
     }
     const order = orderResponse.data;
 
     // Validate items response
     if (!itemsResponse.isSuccess) {
       return {
         isSuccess: false,
         msg: "Failed to fetch order items.",
         data: null,
         error: itemsResponse.error,
       };
     }
     const items = itemsResponse.data;
 
     // Enrich items with variant details
     const enrichedItems = await Promise.all(
       items.map(async (item) => {
         if (item.item_id) {
           const variantResponse = await getProductVariantById(item.item_id);
           return {
             ...item,
             variant: variantResponse.isSuccess ? variantResponse.data : null,
           };
         }
         return { ...item, variant: null };
       })
     );
 
     // Validate summary response
     if (!summaryResponse.isSuccess) {
       return {
         isSuccess: false,
         msg: "Failed to fetch order summary.",
         data: null,
         error: summaryResponse.error,
       };
     }
     const summary = summaryResponse.data;
 
     return {
       isSuccess: true,
       msg: "Order details fetched successfully.",
       data: {
         order,
         items: enrichedItems,
         summary,
       },
       error: "",
     };
   } catch (error: unknown) {
     const typedError = error as Error;
     console.error("Error in getOrderDetails service:", typedError);
 
     return {
       isSuccess: false,
       msg: "An error occurred while fetching order details.",
       data: null,
       error: typedError.message || "Unknown error",
     };
   }
 };
 
 
 