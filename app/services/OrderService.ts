import { insertNewOrder, queryItemsByOrderId, queryOrders, queryOrdersByCustomer, updateOrderStatus , getOrdersByStatus ,queryOrderDetails , getOrderById , getOrderSummary , getProductVariantById , getOrderItems , getTotalOrdersToday , getTotalConfirmedOrders , getTotalProcessingOrders , getTotalShippedOrders , insertOrder, getOrderItemswithVarientDetails,getOrderIdsByCustomerId, getWeeklyOrderVolume , getTotalSalesPerMonth} from "../db/dao/orderDAO";

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

export async function createnewOrder(order:OrderInsert) {
   return await insertOrder(order);
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


export async function getorderstatuspage(order_id:number){
   return await getOrderItemswithVarientDetails(order_id);
}


export async function fetchOrderId(customer_id:number){
   return await getOrderIdsByCustomerId(customer_id);
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
 
 
 // total orders - Today

 export async function fetchTotalOrdersForToday() {
  try {
     const response = await getTotalOrdersToday();

     if (!response.isSuccess) {
        return {
           isSuccess: false,
           msg: response.msg || "Unable to fetch total orders for today.",
           data: null,
           error: response.error || "Unknown error occurred.",
        };
     }

     return {
        isSuccess: true,
        msg: "Successfully fetched total orders for today.",
        data: response.data, 
        error: "",
     };
  } catch (error) {
     console.error("Service Error:", error);
     return {
        isSuccess: false,
        msg: "An error occurred while fetching total orders for today.",
        data: null,
        error: error instanceof Error ? error.message : String(error),
     };
  }
}

// order status condiremed 

export async function fetchTotalConfirmedOrders() {
  try {
    
    const daoResponse = await getTotalConfirmedOrders();

    if (!daoResponse.isSuccess) {
      return {
        isSuccess: false,
        data: 0,
        msg: "Failed to fetch total confirmed orders.",
        error: daoResponse.error,
      };
    }

    
    const totalOrders = daoResponse.data;

    return {
      isSuccess: true,
      data: totalOrders,
      msg: "Successfully retrieved total confirmed orders.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: 0,
      msg: "An unexpected error occurred in the service layer.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

// order status Processing

export async function fetchTotalProcessingOrders() {
  try {
    
    const daoResponse = await getTotalProcessingOrders();

    if (!daoResponse.isSuccess) {
      return {
        isSuccess: false,
        data: 0,
        msg: "Failed to fetch total processing orders.",
        error: daoResponse.error,
      };
    }

    
    const totalOrders = daoResponse.data;

    return {
      isSuccess: true,
      data: totalOrders,
      msg: "Successfully retrieved total processing orders.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: 0,
      msg: "An unexpected error occurred in the service layer.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}


// order status Shipped

export async function fetchTotalShippedOrders() {
  try {
    
    const daoResponse = await getTotalShippedOrders();

    if (!daoResponse.isSuccess) {
      return {
        isSuccess: false,
        data: 0,
        msg: "Failed to fetch total shipped orders.",
        error: daoResponse.error,
      };
    }

    
    const totalOrders = daoResponse.data;

    return {
      isSuccess: true,
      data: totalOrders,
      msg: "Successfully retrieved total shiiped orders.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: 0,
      msg: "An unexpected error occurred in the service layer.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}


// order volume - chart 

export const fetchWeeklyOrderVolume = async () => {
  try {
    const result = await getWeeklyOrderVolume();
    
    if (result.isSuccess) {
      return {
        success: true,
        data: result.data,
        message: result.msg,
      };
    } else {
      return {
        success: false,
        message: result.msg,
        error: result.error,
      };
    }
  } catch (error) {
    console.error("Error fetching weekly order volume:", error);
    return {
      success: false,
      message: "Error fetching weekly order volume",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

//sales

export async function fetchTotalSalesPerMonth() {
  const result = await getTotalSalesPerMonth();

  if (result.isSuccess) {
    // Optionally, you could manipulate or format the data here before sending it back
    return {
      isSuccess: true,
      data: result.data,
      msg: result.msg,
      error: "",
    };
  } else {
    return {
      isSuccess: false,
      data: [],
      msg: result.msg,
      error: result.error,
    };
  }
}