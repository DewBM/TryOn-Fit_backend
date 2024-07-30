import { date, integer, numeric, pgEnum, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";
import { customersTable } from "./Customer";
import { productVariantsTable } from "./Product";

const orderStatusEnum = pgEnum('order_status', ['Confirmed', 'Processing', 'Shipped', 'Delivered']);

export const ordersTable = pgTable('order', {
   order_id: serial('order_id').primaryKey(),
   customer_id: integer('customer_id').references(()=> customersTable.customer_id),
   order_status: orderStatusEnum('order_status'),
   order_date: timestamp('order_date'),
   delivery_date: timestamp('delivery_date'),
   delivery_address: text('delivery_address'),
   sub_total: numeric('sub_total'),
   discount: numeric('discount'),
});


export const orderItemsTable = pgTable('order_item', {
   order_id: integer('order_id').references(()=> ordersTable.order_id),
   item_id: text('item_id').references(()=> productVariantsTable.variant_id),
   quantity: integer('quantity'),
   price: numeric('price'),
   disount: numeric('discount'),
}, (table) => ({
   pk: primaryKey({columns: [table.order_id, table.item_id]})
}));


export type OrderInsert = typeof ordersTable.$inferInsert;
export type OrderItemInsert = typeof orderItemsTable.$inferInsert;