import { eq,sql } from "drizzle-orm";
import { db } from "..";
import { orderItemsTable, ordersTable ,} from "../schema";
import { OrderInsert, OrderItemInsert ,productVariantsTable ,productTable ,sizeStocksTable } from "../schema/Order";
import {StatusType} from "../../types/custom_types"

export async function queryOrders() {
   try {
      const orders = await db.select().from(ordersTable);
      return {
         isSuccess: true,
         data: orders,
         msg: "",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get orders from database.",
         error: e
      };
   }
}


// export async function queryItemsByOrderId(order_id: number) {
//    try {
//       const order_items = await db.select().from(orderItemsTable).where(eq(orderItemsTable.order_id, order_id));
//       return {
//          isSuccess: true,
//          data: order_items,
//          msg: "",
//          error: ""
//       };
//    }
//    catch (e) {
//       console.log(e);
//       return {
//          isSuccess: false,
//          data: null,
//          msg: "Couldn't get order items by order_id form database.",
//          error: e
//       };
//    }
// }

export async function queryItemsByOrderId(order_id: number) {
   try {
      const orderItemsWithDetails = await db
         .select({
            orderId: orderItemsTable.order_id,
            itemId: orderItemsTable.item_id,
            quantity: orderItemsTable.quantity,
            price: orderItemsTable.price,
            discount: orderItemsTable.disount,
            variantName: productVariantsTable.name,
            variantColor: productVariantsTable.color,
            productId: productVariantsTable.product_id,
            productCategory: productTable.category,
            productGender: productTable.gender,
            design: productVariantsTable.design,
         })
         .from(orderItemsTable)
         .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id ))
         .innerJoin(productTable, eq(productVariantsTable.product_id, productTable.product_id))
         .where(eq(orderItemsTable.order_id, order_id));

      return {
         isSuccess: true,
         data: orderItemsWithDetails,
         msg: "",
         error: ""
      };
   } catch (e) {
      console.error(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get detailed order items by order_id from the database.",
         error: e
      };
   }
}



export async function queryOrdersByCustomer(customer_id: number) {
   try {
      const order_items = await db.select().from(ordersTable).where(eq(ordersTable.customer_id, customer_id));
      return {
         isSuccess: true,
         data: order_items,
         msg: "",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't get orders by customer_id form database.",
         error: e
      };
   }
}

// weda
// export async function insertNewOrder(order: OrderInsert & {order_items: OrderItemInsert[]}) {
//    try {
//       db.transaction(async (tx) => {
//          await tx.insert(ordersTable).values(order).onConflictDoNothing();
//          await tx.insert(orderItemsTable).values(order.order_items);   
//       });

//       return {
//          isSuccess: true,
//          msg: "Order Inserted to database successfully!",
//          error: ""
//       };
//    }
//    catch (e) {
//       console.log(e);
//       return {
//          isSuccess: false,
//          msg: "Couldn't insert order to database.",
//          error: e
//       };
//    }
// }


// export async function insertNewOrder(order: OrderInsert & { order_items: OrderItemInsert[] }) {
//    try {
//      // Wrap the transaction in an async function that returns a promise
//      const result = await db.transaction(async (tx) => {
//        // Insert the order into the ordersTable
//        await tx.insert(ordersTable).values(order).onConflictDoNothing();
 
//        // Insert the order items into the orderItemsTable
//        await tx.insert(orderItemsTable).values(order.order_items);
//      });
 
//      return {
//        isSuccess: true,
//        msg: "Order inserted into the database successfully!",
//        error: ""
//      };
//    } catch (e) {
//      console.log(e);
//      return {
//        isSuccess: false,
//        msg: "Couldn't insert order into the database.",
//        error: e 
//      };
//    }
//  }

//proper work but +10
// export async function insertNewOrder(order: OrderInsert & { order_items: OrderItemInsert[] }) {
//    try {
//       const result = await db.transaction(async (tx) => {
//          // Insert the order and return the 'order_id'
//          // Assuming you have the correct schema for `ordersTable`
// const insertedOrder = await tx.insert(ordersTable)
// .values(order)
// .returning(); // Using the `columns` property if needed
// // Use proper reference to columns

//          const orderId = insertedOrder[0]?.order_id;
//          if (!orderId) {
//             throw new Error("Failed to insert order or get order_id.");
//          }

//          // Attach order_id to each order item
//          const orderItemsWithOrderId = order.order_items.map(item => ({
//             ...item,
//             order_id: orderId as number
//          }));
         
//          // Insert order items
//          await tx.insert(orderItemsTable).values(orderItemsWithOrderId);
//       });

//       return {
//          isSuccess: true,
//          msg: "Order inserted into database successfully!",
//          error: ""
//       };
//    } catch (e: unknown) {
//       console.error("Error inserting order:", e);
//       return {
//          isSuccess: false,
//          msg: "Couldn't insert order into the database.",
//          error: (e instanceof Error ? e.message : "Unknown error")
//       };
//    }
// }


export async function insertNewOrder(order: OrderInsert & { order_items: OrderItemInsert[] }) {
   try {
      const result = await db.transaction(async (tx) => {
   
         const insertedOrder = await db.insert(ordersTable)
            .values(order) 
            .returning(); 
         
   
       
         const orderId = insertedOrder[0]?.order_id;
         console.log("orderid" ,orderId);
         if (!orderId) {
            throw new Error("Failed to insert order or get order_id.");
         }

         
         const orderItemsWithOrderId = order.order_items.map(item => ({
            ...item,
            order_id: orderId as number
            
         }));console.log("console.log(orderItemsWithOrderId);",orderItemsWithOrderId);

       
         await tx.insert(orderItemsTable).values(orderItemsWithOrderId);
      });

      return {
         isSuccess: true,
         msg: "Order inserted into database successfully!",
         error: ""
      };
   } catch (e: unknown) {
      console.error("Error inserting order:", e);
      return {
         isSuccess: false,
         msg: "Couldn't insert order into the database.",
         error: (e instanceof Error ? e.message : "Unknown error")
      };
   }
} 
export async function insertOrder(order: OrderInsert) {
   try {
     // Insert the order into the database
     const result = await db.insert(ordersTable).values(order).returning();
 
     return {
       isSuccess: true,
       data: result, 
       msg: "Order inserted successfully.",
     };
   } catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Couldn't insert order to database.",
         error: e
      };
   }
 }


export async function updateOrderStatus(order_id: number, status: StatusType) {
   try {
      if (status==='Delivered')
         await db.update(ordersTable).set({order_status: status, delivery_date: new Date()}).where(eq(ordersTable.order_id, order_id));
      else
         await db.update(ordersTable).set({order_status: status}).where(eq(ordersTable.order_id, order_id));

      return {
         isSuccess: true,
         msg: "Order status updated successfully.",
         error: ""
      };
   }
   catch (e) {
      console.log(e);
      return {
         isSuccess: false,
         msg: "Couldn't update order status.",
         error: e
      };
   }
}


export async function getOrdersByStatus(status: StatusType) {
   try {
      const orders = await db
         .select()
         .from(ordersTable)
         .where(eq(ordersTable.order_status, status));

      return orders;
   } catch (e) {
      console.log(e);
      throw new Error("Couldn't fetch orders.");
   }
}


// DAO function to get all orders (without filtering by status)
export async function getAllOrders() {
   try {
      const orders = await db
         .select()
         .from(ordersTable);  // No filtering by status, just fetch all records

      return orders;
   } catch (e) {
      console.log(e);
      throw new Error("Couldn't fetch all orders.");
   }
}


export async function queryOrderDetails(order_id: number) {
   try {
      const orderDetails = await db
         .select()
         .from(ordersTable)
         .where(eq(ordersTable.order_id, order_id));

      if (orderDetails.length > 0) {
         return {
            isSuccess: true,
            data: orderDetails,
            msg: "",
            error: "",
         };
      } else {
         return {
            isSuccess: false,
            data: null,
            msg: "No order found with the provided order_id.",
            error: "",
         };
      }
   } catch (e) {
      console.error(e);
      return {
         isSuccess: false,
         data: null,
         msg: "Couldn't fetch order details from the database.",
         error: e,
      };
   }
}


// export async function getOrderItemswithVarientDetails(order_id:number){
//    try{
//       const orderwithvarients = await db 
//       .select({
      
//          CustomerId: ordersTable.customer_id,
//          orderId:ordersTable.order_id,
//          orderStatus:ordersTable.order_status,
//          orderDate:ordersTable.order_date,
//          delivaryDate:ordersTable.delivery_date,
//          deliveryAddress:ordersTable.delivery_address,
//          subTotal:ordersTable.sub_total,
//          discount:ordersTable.discount,
//          quantity:orderItemsTable.quantity,
//          ItemId:orderItemsTable.item_id,
//          name: productVariantsTable.name,
//          price: productVariantsTable.price,
         
//       })
//       .from(orderItemsTable)
//          .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id ))
//          .innerJoin(productTable, eq(productVariantsTable.product_id, productTable.product_id))
//          .where(eq(orderItemsTable.order_id, order_id));
//          return {
//             isSuccess: true,
//             data: getOrderItemswithVarientDetails,
//             msg: "",
//             error: ""
//          };
//       } catch (e) {
//          console.error(e);
//          return {
//             isSuccess: false,
//             data: null,
//             msg: "Couldn't get detailed order items by order_id from the database.",
//             error: e
//          };
//       }
// }
export async function getOrderItemswithVarientDetails(order_id: number) {
   try {
     const orderWithVariants = await db
       .select({
         orderId: ordersTable.order_id,
         customerId: ordersTable.customer_id,
         orderStatus: ordersTable.order_status,
         orderDate: ordersTable.order_date,
         deliveryDate: ordersTable.delivery_date,
         deliveryAddress: ordersTable.delivery_address,
         subTotal: ordersTable.sub_total,
         discount: ordersTable.discount,
         quantity: orderItemsTable.quantity,
         itemId: orderItemsTable.item_id,
         variantName: productVariantsTable.name,
         variantPrice: productVariantsTable.price,
         variantColor: productVariantsTable.color,
         variantDesign: productVariantsTable.design,
       })
       .from(orderItemsTable)
       .innerJoin(
         ordersTable,
         eq(orderItemsTable.order_id, ordersTable.order_id)
       )
       .innerJoin(
         productVariantsTable,
         eq(orderItemsTable.item_id, productVariantsTable.variant_id)
       )
       .where(eq(orderItemsTable.order_id, order_id));
 
     return {
       isSuccess: true,
       data: orderWithVariants,
       msg: "Order items with variant details fetched successfully.",
       error: null,
     };
   } catch (error) {
     console.error("Error fetching order items with variant details:", error);
     return {
       isSuccess: false,
       data: null,
       msg: "Couldn't get detailed order items by order_id from the database.",
       error: error,
     };
   }
 }
 
 

export async function getOrderIdsByCustomerId(customerId: number): Promise<number[]> {
   try {
     // Query to select order_id from the ordersTable where customer_id matches
     const orders = await db
       .select({ order_id: ordersTable.order_id })
       .from(ordersTable)
       .where(eq(ordersTable.customer_id, customerId));
 
     // Map the results to extract only the order_id values
     return orders.map((order) => order.order_id);
   } catch (error) {
     console.error('Error fetching order IDs:', error);
     throw new Error('Failed to retrieve order IDs by customer ID.');
   }
 }