import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { orderItemsTable, ordersTable } from "../schema";
import {
  OrderInsert,
  OrderItemInsert,
  productVariantsTable,
  productTable,
  sizeStocksTable,
} from "../schema/Order";
import { customersTable } from "../schema";
import { addressesTable } from "../schema/Address";
import { StatusType } from "../../types/custom_types";

export async function queryOrders() {
  try {
    const orders = await db.select().from(ordersTable);
    return {
      isSuccess: true,
      data: orders,
      msg: "",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get orders from database.",
      error: e,
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
      .innerJoin(
        productVariantsTable,
        eq(orderItemsTable.item_id, productVariantsTable.variant_id)
      )
      .innerJoin(
        productTable,
        eq(productVariantsTable.product_id, productTable.product_id)
      )
      .where(eq(orderItemsTable.order_id, order_id));

    return {
      isSuccess: true,
      data: orderItemsWithDetails,
      msg: "",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get detailed order items by order_id from the database.",
      error: e,
    };
  }
}

export async function queryOrdersByCustomer(customer_id: number) {
  try {
    const order_items = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.customer_id, customer_id));
    return {
      isSuccess: true,
      data: order_items,
      msg: "",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Couldn't get orders by customer_id form database.",
      error: e,
    };
  }
}

export async function insertNewOrder(
  order: OrderInsert & { order_items: OrderItemInsert[] }
) {
  try {
    db.transaction(async (tx) => {
      await tx.insert(ordersTable).values(order).onConflictDoNothing();
      await tx.insert(orderItemsTable).values(order.order_items);
    });

    return {
      isSuccess: true,
      msg: "Order Inserted to database successfully!",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      msg: "Couldn't insert order to database.",
      error: e,
    };
  }
}

export async function updateOrderStatus(order_id: number, status: StatusType) {
  try {
    if (status === "Delivered")
      await db
        .update(ordersTable)
        .set({ order_status: status, delivery_date: new Date() })
        .where(eq(ordersTable.order_id, order_id));
    else
      await db
        .update(ordersTable)
        .set({ order_status: status })
        .where(eq(ordersTable.order_id, order_id));

    return {
      isSuccess: true,
      msg: "Order status updated successfully.",
      error: "",
    };
  } catch (e) {
    console.log(e);
    return {
      isSuccess: false,
      msg: "Couldn't update order status.",
      error: e,
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
    const orders = await db.select().from(ordersTable); // No filtering by status, just fetch all records

    return orders;
  } catch (e) {
    console.log(e);
    throw new Error("Couldn't fetch all orders.");
  }
}

// export async function queryOrderDetails(order_id: number) {
//    try {
//       const orderDetails = await db
//          .select()
//          .from(ordersTable)
//          .where(eq(ordersTable.order_id, order_id));

//       if (orderDetails.length > 0) {
//          return {
//             isSuccess: true,
//             data: orderDetails,
//             msg: "",
//             error: "",
//          };
//       } else {
//          return {
//             isSuccess: false,
//             data: null,
//             msg: "No order found with the provided order_id.",
//             error: "",
//          };
//       }
//    } catch (e) {
//       console.error(e);
//       return {
//          isSuccess: false,
//          data: null,
//          msg: "Couldn't fetch order details from the database.",
//          error: e,
//       };
//    }
// }

//new order get for oder view

export async function getOrderById(orderId: number) {
  try {
    const order = await db
      .select({
        order_id: ordersTable.order_id,
        delivery_address: sql`CONCAT(
           ${addressesTable.address_line_1}, ', ',
           COALESCE(${addressesTable.address_line_2}, ''), ', ',
           ${addressesTable.city}, ', ',
           ${addressesTable.district}, ', ',
           ${addressesTable.postal_code}
         )`.as("delivery_address"), // Use SQL CONCAT and handle NULL values
        customer_name: sql`CONCAT(
           ${customersTable.first_name}, ' ',
           ${customersTable.last_name}
         )`.as("customer_name"), // Use SQL CONCAT
      })
      .from(ordersTable)
      .leftJoin(
        customersTable,
        eq(ordersTable.customer_id, customersTable.customer_id)
      )
      .leftJoin(
        addressesTable,
        eq(customersTable.customer_id, addressesTable.customer_id)
      ) // Join with addressesTable
      // Join with usersTable for contact number
      .where(eq(ordersTable.order_id, orderId))
      .limit(1);

    return {
      isSuccess: true,
      data: order[0] || null,
      msg: "Order fetched successfully.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to fetch order.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function getOrderItems(orderId: number) {
  try {
    const items = await db
      .select()
      .from(orderItemsTable)
      .where(eq(orderItemsTable.order_id, orderId));

    return {
      isSuccess: true,
      data: items,
      msg: "Order items fetched successfully.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: [],
      msg: "Failed to fetch order items.",
      error: e,
    };
  }
}

export async function getProductVariantById(variantId: string) {
  try {
    // Select specific fields from the productVariantsTable
    const variant = await db
      .select({
        variant_id: productVariantsTable.variant_id,
        product_id: productVariantsTable.product_id,
        name: productVariantsTable.name,
        color: productVariantsTable.color,
        design: productVariantsTable.design,
        price: productVariantsTable.price,
        description: productVariantsTable.description,
        createdAt: productVariantsTable.createdAt,
        updatedAt: productVariantsTable.updatedAt,
        searchable_text: productVariantsTable.searchable_text,
        img_front: productVariantsTable.img_front,
        img_back: productVariantsTable.img_back,
      })
      .from(productVariantsTable)
      .where(eq(productVariantsTable.variant_id, variantId))
      .limit(1);

    return {
      isSuccess: true,
      data: variant[0] || null,
      msg: "Product variant fetched successfully.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to fetch product variant.",
      error: e,
    };
  }
}

export async function getOrderSummary(orderId: number) {
  try {
    const summary = await db
      .select({
        sub_total: ordersTable.sub_total,
        // delivery: ordersTable.delivery,
        // total: ordersTable.total,
      })
      .from(ordersTable)
      .where(eq(ordersTable.order_id, orderId))
      .limit(1);

    return {
      isSuccess: true,
      data: summary[0] || null,
      msg: "Order summary fetched successfully.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: null,
      msg: "Failed to fetch order summary.",
      error: e,
    };
  }
}

/////////////////////

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

// total orders - Today

export async function getTotalOrdersToday() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    today.setMinutes(today.getMinutes() + 330); 

    const result = await db
      .select({
        totalOrders: sql`COUNT(*)`.as("total_orders"),
      })
      .from(ordersTable)
      .where(
        sql`DATE(${ordersTable.order_date}) = ${
          today.toISOString().split("T")[0]
        }`
      );

    return {
      isSuccess: true,
      data: result[0]?.totalOrders || 0,
      msg: "Total orders fetched successfully.",
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      isSuccess: false,
      data: 0,
      msg: "Failed to fetch total orders for today.",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

//order status- confirmend 

export async function getTotalConfirmedOrders() {
   try {
     const result = await db
       .select({
         totalOrders: sql`COUNT(*)`.as("total_orders"),
       })
       .from(ordersTable)
       .where(
         sql`${ordersTable.order_status} = 'Confirmed'`
       );
 
     return {
       isSuccess: true,
       data: result[0]?.totalOrders || 0,
       msg: "Total confirmed orders fetched successfully.",
       error: "",
     };
   } catch (e) {
     console.error(e);
     return {
       isSuccess: false,
       data: 0,
       msg: "Failed to fetch total confirmed orders.",
       error: e instanceof Error ? e.message : String(e),
     };
   }
 }

 //order status- processing

 export async function getTotalProcessingOrders() {
   try {
     const result = await db
       .select({
         totalOrders: sql`COUNT(*)`.as("total_orders"),
       })
       .from(ordersTable)
       .where(
         sql`${ordersTable.order_status} = 'Processing'`
       );
 
     return {
       isSuccess: true,
       data: result[0]?.totalOrders || 0,
       msg: "Total processing orders fetched successfully.",
       error: "",
     };
   } catch (e) {
     console.error(e);
     return {
       isSuccess: false,
       data: 0,
       msg: "Failed to fetch total processing orders.",
       error: e instanceof Error ? e.message : String(e),
     };
   }
 }


 //order status- shipped

 export async function getTotalShippedOrders() {
   try {
     const result = await db
       .select({
         totalOrders: sql`COUNT(*)`.as("total_orders"),
       })
       .from(ordersTable)
       .where(
         sql`${ordersTable.order_status} = 'Shipped'`
       );
 
     return {
       isSuccess: true,
       data: result[0]?.totalOrders || 0,
       msg: "Total Shipped orders fetched successfully.",
       error: "",
     };
   } catch (e) {
     console.error(e);
     return {
       isSuccess: false,
       data: 0,
       msg: "Failed to fetch total shipped orders.",
       error: e instanceof Error ? e.message : String(e),
     };
   }
 }