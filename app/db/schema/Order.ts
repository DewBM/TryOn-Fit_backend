import { date, integer, numeric, pgEnum, pgTable, primaryKey, serial, text, timestamp  } from "drizzle-orm/pg-core";
import { customersTable } from "./Customer";


const orderStatusEnum = pgEnum('order_status', ['Confirmed', 'Processing', 'Shipped', 'Delivered','Completed']);


const genderEnum = pgEnum('gender', ['Male', 'Female', 'Unisex']);
const ageGroupEnum = pgEnum('age_group', ['Adult', 'Kids', 'All Ages']);


export const sizeStocksTable = pgTable('size_stocks', {
   variant_id: text('variant_id').primaryKey(),  // Primary key for the variant ID
   size: text('size'),  // Size of the product (e.g., S, M, L, XL)
   quantity: integer('quantity'),  // Quantity of the product variant in stock
 });

// Product table schema
export const productTable = pgTable('product', {
   product_id: text('product_id').primaryKey(),  // Primary Key for the product
   supplier: text('supplier'),  // Supplier of the product
   category: text('category'),  // Category of the product
   gender: genderEnum('gender'),  // Gender for which the product is designed
   age_group: ageGroupEnum('age_group'),  // Age group the product targets
   createdAt: timestamp('createdAt'),  // Creation timestamp
   updatedAt: timestamp('updatedAt'),  // Last update timestamp
});

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

export const productVariantsTable = pgTable('product_variants', {
   variant_id: text('variant_id').primaryKey(),
   product_id: text('product_id'),
   name: text('name'),
   color: text('color'),
   design: text('design'),
   price: numeric('price'),
   description: text('description'),
   createdAt: timestamp('createdAt'),
   updatedAt: timestamp('updatedAt'),
   searchable_text: text('searchable_text'),
   img_front: text('img_front'),
   img_back: text('img_back'),
});

export type ProductVariantInsert = typeof productVariantsTable.$inferInsert;

export type OrderInsert = typeof ordersTable.$inferInsert;
export type OrderItemInsert = typeof orderItemsTable.$inferInsert;

//////////////////
export type ProductInsert = typeof productTable.$inferInsert;
