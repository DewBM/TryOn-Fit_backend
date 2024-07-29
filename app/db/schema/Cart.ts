import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./User";
import { productVariantsTable } from "./Product";


export const cartsTable = pgTable('cart', {
   cart_id: serial('card_id').primaryKey(),
   user_id: integer('user)id').references(()=> users.userId).notNull(),
});


export const cartItemsTable = pgTable('cart_item', {
   cart_item_id: serial('cart_item_id').primaryKey(),
   cart_id: integer('cart_id').references(()=> cartsTable.cart_id).notNull(),
   variant_id: text('variant_id').references(()=> productVariantsTable.variant_id).notNull(),
   quantity: integer('quantity').default(0).notNull()
});


export type CartItemInsert = typeof cartItemsTable.$inferInsert;
export type CartInsert = typeof cartsTable.$inferSelect 