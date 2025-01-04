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
import { addressesTable } from "../schema/Address";
import { customersTable } from "../schema";
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

//new order get for order view for DC

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
         )`.as("delivery_address"),
        customer_name: sql`CONCAT(
           ${customersTable.first_name}, ' ',
           ${customersTable.last_name}
         )`.as("customer_name"),
      })
      .from(ordersTable)
      .leftJoin(
        customersTable,
        eq(ordersTable.customer_id, customersTable.customer_id)
      )
      .leftJoin(
        addressesTable,
        eq(customersTable.customer_id, addressesTable.customer_id)
      )

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
