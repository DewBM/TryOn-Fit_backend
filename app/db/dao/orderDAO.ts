import { eq } from "drizzle-orm";
import { db } from "..";
import { orderItemsTable, ordersTable } from "../schema";
import { OrderInsert, OrderItemInsert } from "../schema/Order";
import {StatusType} from "../../types/custom_types"
import { productVariantsTable } from "../schema/Product";
import { productsTable } from "../schema/Product";

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


export async function queryItemsByOrderId(order_id: number) {
   try {
      const order_items = await db.select().from(orderItemsTable).where(eq(orderItemsTable.order_id, order_id));
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
         msg: "Couldn't get order items by order_id form database.",
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


export async function insertNewOrder(order: OrderInsert & {order_items: OrderItemInsert[]}) {
   try {
      db.transaction(async (tx) => {
         await tx.insert(ordersTable).values(order).onConflictDoNothing();
         await tx.insert(orderItemsTable).values(order.order_items);   
      });

      return {
         isSuccess: true,
         msg: "Order Inserted to database successfully!",
         error: ""
      };
   }
   catch (e) {
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


export async function queryOrderItemsWithDetails(order_id: number) {
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
            productCategory: productsTable.category,
            productGender: productsTable.gender,
         })
         .from(orderItemsTable)
         .innerJoin(productVariantsTable, eq(orderItemsTable.item_id, productVariantsTable.variant_id))
         .innerJoin(productsTable, eq(productVariantsTable.product_id, productsTable.product_id))
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
